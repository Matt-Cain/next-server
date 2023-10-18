import { mergeResolvers } from "@graphql-tools/merge";
import auth from "./auth";
// import date from './date';
import plan from "./plan";

const resolvers = mergeResolvers([auth, plan]) as any;

export default resolvers;
