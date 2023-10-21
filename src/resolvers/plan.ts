import data from '../db/db';
import {
  createPlan,
  createMealPlan,
  getPlans,
  getPlan,
  getMealPlan,
} from '../actions/plans';

const resolvers = {
  Query: {
    getMealPlan,
    getPlan,
    getPlans,
  },
  Mutation: {
    createPlan,
    createMealPlan,
  },
};

export default resolvers;
