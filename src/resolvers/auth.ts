import { login, me, signUp } from '../auth/authFlow';

const resolvers = {
  Query: { me },
  Mutation: {
    login,
    signUp,
  },
};

export default resolvers;
