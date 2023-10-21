import { JwtPayload } from 'jsonwebtoken';
import { findUserById } from '../actions/users';
import { setTokens, validateAccessToken, validateRefreshToken } from './jwt';

type User = { id: string };
type Context = { req: any; res: any };

export const context = async ({ req, res }: Context) => {
  // Note that 'null' may come across the wire as a string
  let accessToken = req.headers['x-access-token']?.replace(/^null$/, '');
  let refreshToken = req.headers['x-refresh-token']?.replace(/^null$/, '');

  let user = null;
  let userId = null;

  if (accessToken) {
    const decodedAccessToken = validateAccessToken(accessToken) as JwtPayload;
    const {
      user: {
        id: { id },
      },
    } = decodedAccessToken || { user: { id: { id: null } } };

    userId = id;

    if (!userId) {
      // access token may have expired so check the refresh token
      if (refreshToken) {
        const { user: tokenUser } = validateRefreshToken(
          refreshToken,
        ) as JwtPayload;

        if (tokenUser) {
          /* refresh the tokens and make them available through headers to the client
           * this allows the client to transparently get refreshed headers without
           * requiring a separate GraphQL query request */
          userId = tokenUser.id;
          ({ accessToken, refreshToken } = setTokens(tokenUser));
          res.append(
            'Access-Control-Expose-Headers',
            'x-access-token,x-refresh-token',
          );
          res.header('x-access-token', accessToken);
          res.header('x-refresh-token', refreshToken);
        }
      } else
        console.info(
          `Invalid/expired access token presented but refreshToken null or missing!`,
        );
    }
    /* if we've found an authenticated user, add the user object to req for access by resolvers via req.user
     * this includes *all* the user's fields but none of this goes back to the client unless requested via a graphql query */
    if (userId) {
      user = await findUserById(userId);
    }
  }
  return { req, res, user };
};
