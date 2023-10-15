import { GraphQLError } from 'graphql';
import data from "../db/db";

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
    mealPlans: () => [],
    mealPlan: (parent, args) => {
      return mealPlans.find((mealPlan) => mealPlan.id === args.id);
    },
  },
  Mutation: {
    createMealPlan: (parent, args) => {
      console.log(parent, args);
    }
  }
};

export default resolvers;