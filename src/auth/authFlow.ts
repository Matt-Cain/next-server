import { GraphQLError } from 'graphql';
import { comparePromise, setTokens } from './jwt.js';
import { genHash } from './genHash.js';
import { createUser, findUserByEmail } from '../actions/users';

type Auth = {
  email: string;
  password: string;
};

export const me = async (_: any, __: any, { user }: any) => {
  console.log({ user });
  return user;
};

export const login = async (_: any, { email, password }: Auth) => {
  const user = await findUserByEmail(email);
  if (user && (await comparePromise(password, user.hash)))
    return setTokens(user.id);
  throw new GraphQLError('Invalid credentials', {
    extensions: { code: 'UNAUTHENTICATED' },
  });
};

export const signUp = async (_: any, { email, password }: Auth) => {
  const userExists = await findUserByEmail(email);
  if (userExists) {
    throw new GraphQLError('User already exists', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  const hash = await genHash(password);
  const user = await createUser({ email, hash });

  return setTokens(user.id);
};
