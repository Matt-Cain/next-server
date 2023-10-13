import { GraphQLError } from 'graphql';
import { login } from '../auth/login';

const resolvers = {
  Query: {
    me: (_, __, req) => {
      if (req.user) return req.user;
      else throw new GraphQLError('foo', { extensions: { code: 403 } });
    },
  },
  Mutation: {
    login,
  },
};

export default resolvers;