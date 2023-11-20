import { Types } from 'mongoose';
import Course from '../models/course';

type Context = {
  user: {
    id: Types.ObjectId;
    email: string;
    hash: string;
  };
};

export const createCourse = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;

  const { type, name, recipe, ingredients } = params;

  const course = new Course({
    type,
    name,
    recipe,
    ingredients,
    user: user.id,
  });

  await course.save();

  return course;
};

export const getCourses = async (
  _parent: any,
  _params: any,
  context: Context,
) => {
  const { user } = context;

  const courses = await Course.find({ user: user.id });

  return courses;
};

export const getCourse = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;

  const { id } = params;

  const course = await Course.findOne({ _id: id, user: user.id });

  return course;
};

export const updateCourse = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;

  const { id, ...rest } = params;

  const course = await Course.findOneAndUpdate(
    { _id: id, user: user.id },
    rest,
    { new: true },
  );

  return course;
};

export const deleteCourse = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;

  const { id } = params;

  const deletedCourse = await Course.findOneAndDelete({
    _id: id,
    user: user.id,
  });
  console.log({ deletedCourse });

  return Boolean(deletedCourse);
};
