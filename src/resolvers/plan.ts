import {
  createPlan,
  deletePlan,
  getPlan,
  getPlans,
  swapDates,
  updatePlan,
} from '../actions/plan';

const resolvers = {
  Query: {
    getPlan,
    getPlans,
  },
  Mutation: {
    createPlan,
    deletePlan,
    swapDates,
    updatePlan,
  },
};

export default resolvers;
