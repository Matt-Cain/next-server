import { comparePromise, setTokens } from './jwt.js';

import { GraphQLError } from 'graphql';
import { findUserByUserName } from '../db/users';
import createArticle  from '../db/createArticle'

export const login = async (_: any, { username, password }) => {
  const user = findUserByUserName(username);
  createArticle();
  if (user && (await comparePromise(password, user.hash)))
    return setTokens(user);
  else
    throw new GraphQLError('Invalid credentials', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
};