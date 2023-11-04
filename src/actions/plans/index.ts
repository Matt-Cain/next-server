import { Types, Model } from 'mongoose';
import Plan from '../../models/plan';
import MealPlan from '../../models/mealPlan';
import Meal from '../../models/meal';
import Course from '../../models/course';

type Context = {
  user: {
    id: Types.ObjectId;
    email: string;
    hash: string;
  };
};

type CreatePlanParams = {
  startDate: string;
  endDate: string;
};
export const createPlan = async (
  _parent: any,
  params: CreatePlanParams,
  context: Context,
) => {
  const { startDate, endDate } = params;
  const { user } = context;

  const plan = new Plan({
    startDate,
    endDate,
    user: user.id,
  });

  await plan.save();

  return plan;
};

type CreateMealPlanParams = {
  planId: string;
  day: string;
  placeholder: string;
};
export const createMealPlan = async (
  _parent: any,
  params: CreateMealPlanParams,
) => {
  const { planId, day, placeholder } = params;
  console.log({ planId, day, placeholder });

  const mealPlan = new MealPlan({
    plan: planId,
    placeholder,
    day,
  });

  await mealPlan.save();

  await Plan.findByIdAndUpdate(
    planId,
    { $push: { mealPlans: mealPlan.id } },
    { new: true },
  );

  return mealPlan;
};

type AddMealToPlanParams = {
  startDate: string;
  endDate: string;
};
export const getPlans = async (
  _parent: any,
  params: AddMealToPlanParams,
  context: Context,
) => {
  const { user } = context;
  const { startDate, endDate } = params;

  const plans = await Plan.find({
    startDate: { $gte: startDate },
    endDate: { $lte: endDate },
    user: user.id,
  });

  return plans;
};

type GetPlansParams = {
  id: string;
};
export const getPlan = async (
  _parent: any,
  params: GetPlansParams,
  context: Context,
) => {
  const { id } = params;

  const plan = await Plan.findById(id).populate('mealPlans');
  console.log({ mealPlans: plan?.mealPlans });

  // @ts-ignore
  await plan?.mealPlans[0]?.populate('meal');

  // @ts-ignore
  console.log(plan?.mealPlans[0]?.meal);

  return plan;
};

type GetMealParams = {
  mealPlanId: string;
};
export const getMealPlan = async (
  _parent: any,
  params: GetMealParams,
  context: Context,
) => {
  const { mealPlanId } = params;

  const mealPlan = await MealPlan.findById(mealPlanId)
    .populate({
      path: 'meal',
      populate: {
        path: 'entree sides',
      },
    })
    .exec();

  return mealPlan;
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

export const createMeal = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;

  const { mealPlanId, name, entree, sides } = params;

  const meal = new Meal({
    name,
    entree,
    sides,
    user: user.id,
  });

  await meal.save();
  await meal.populate(['entree', 'sides']);

  const { _id: mealId } = meal;
  console.log({ mealId });

  const mealPlan = await MealPlan.findOneAndUpdate(
    { _id: mealPlanId },
    { meal: mealId },
    { new: true },
  );

  console.log({ meal, mealPlan });

  return meal;
};

export const updateMeal = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;
  console.log({ params });
  const { id, ...rest } = params;

  const meal = await Meal.findOneAndUpdate({ _id: id, user: user.id }, rest, {
    new: true,
  });

  return Boolean(meal);
};
