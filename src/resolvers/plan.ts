import data from "../db/db";
import { createPlan, createMealPlan, getPlans, getPlan, getMeal } from '@/actions/plans';

const resolvers = {
  Query: {
    getMeal,
    getPlan,
    getPlans,
  },
  Mutation: {
    createPlan,
    createMealPlan
  }
};

export default resolvers;