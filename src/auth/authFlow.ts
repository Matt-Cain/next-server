import { comparePromise, setTokens } from './jwt.js';
import { GraphQLError } from 'graphql';
import { genHash } from './genHash.js';
import { createUser, findUserByEmail } from '@/actions/users';

export const login = async (_: any, { email, password }) => {
  const user = await findUserByEmail(email);
  if (user && (await comparePromise(password, user.hash)))
    return setTokens(user);
  else
    throw new GraphQLError('Invalid credentials', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
};

export const signUp = async (_: any, { email, password }) => {
  const userExists = await findUserByEmail(email);
  console.log({ userExists });
  if (userExists) {
    throw new GraphQLError('User already exists', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  const hash = await genHash(password);
  const user = await createUser({ email, hash });

  return setTokens(user);
};