import { mergeTypeDefs } from '@graphql-tools/merge';

import auth from './auth';
import course from './course';
import date from './date';
import plan from './plan';
import shopping from './shopping';
import inventory from './inventory';

const typeDefs = mergeTypeDefs([auth, course, date, inventory, plan, shopping]);

export default typeDefs;
