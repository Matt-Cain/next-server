import data from "../db/db";

const { ingredients, courses, meals, mealPlans } = data;


const resolvers = {
  Query: {
    meal: (parent, args) => {
      return meals.find((meal) => meal.id === args.id);
    },
    mealPlans: () => mealPlans,
    mealPlan: (parent, args) => {
      return mealPlans.find((mealPlan) => mealPlan.id === args.id);
    },
  },
};

export default resolvers;