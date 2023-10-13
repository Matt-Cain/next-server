import { comparePromise, setTokens } from './jwt.js';

import { GraphQLError } from 'graphql';
import { findUserByUserName } from '../db/users';

export const login = async (_: any, { username, password }) => {
  const user = findUserByUserName(username);
  if (user && (await comparePromise(password, user.hash)))
    return setTokens(user);
  else
    throw new GraphQLError('Invalid credentials', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
};