import { mergeResolvers } from '@graphql-tools/merge';
import auth from './auth';
import course from './course';
import date from './date';
import plan from './plan';
import shopping from './shopping';

const resolvers = mergeResolvers([auth, course, date, plan, shopping]) as any;

export default resolvers;
