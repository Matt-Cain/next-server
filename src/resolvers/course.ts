import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from '../actions/course';

const resolvers = {
  Query: {
    getCourse,
    getCourses,
  },
  Mutation: {
    createCourse,
    deleteCourse,
    updateCourse,
  },
};

export default resolvers;
