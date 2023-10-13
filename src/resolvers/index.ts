import { mergeResolvers } from '@graphql-tools/merge';
import auth from './auth';
import plan from './plan';

const resolvers = mergeResolvers([auth, plan]);

export default resolvers;