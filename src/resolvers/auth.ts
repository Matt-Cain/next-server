import { GraphQLError } from 'graphql';
import { login, signUp } from '../auth/authFlow';

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (user) return user;
      else throw new GraphQLError('foo', { extensions: { code: 403 } });
    },
  },
  Mutation: {
    login,
    signUp
  },
};

export default resolvers;