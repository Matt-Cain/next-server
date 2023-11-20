import { mergeTypeDefs } from '@graphql-tools/merge';

import auth from './auth';
import course from './course';
import date from './date';
import plan from './plan';
import shopping from './shopping';

const typeDefs = mergeTypeDefs([auth, course, date, plan, shopping]);

export default typeDefs;
