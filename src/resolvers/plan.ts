import { GraphQLError } from 'graphql';
import data from "../db/db";
import { createPlan, getPlans } from '@/actions/plans';

const { ingredients, courses, meals, mealPlans } = data;

const resolvers = {
  Query: {
    meal: (parent, args, { user }) => {
      if (user) {
        return meals.find((meal) => meal.id === args.id);
      }
      else {
        throw new GraphQLError('Not Authenticated', { extensions: { code: 403 } });
      }
    },
    getPlan: () => null,
    getPlans,
  },
  Mutation: {
    createPlan
  }
};

export default resolvers;