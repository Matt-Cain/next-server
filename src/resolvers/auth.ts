import { GraphQLError } from "graphql";
import { login, signUp } from "../auth/authFlow";

const resolvers = {
  Mutation: {
    login,
    signUp,
  },
};

export default resolvers;
