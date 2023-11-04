import {
  createCourse,
  createPlan,
  createMealPlan,
  createMeal,
  getPlans,
  getPlan,
  getMealPlan,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  updateMeal,
} from '../actions/plans';

const resolvers = {
  Query: {
    getMealPlan,
    getPlan,
    getPlans,
    getCourses,
    getCourse,
  },
  Mutation: {
    createPlan,
    createMealPlan,
    createCourse,
    createMeal,
    updateMeal,
    updateCourse,
    deleteCourse,
  },
};

export default resolvers;
