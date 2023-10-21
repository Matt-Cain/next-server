import { Types } from 'mongoose';
import Plan from '../../models/plan';
import MealPlan from '../../models/mealPlan';

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
};
export const createMealPlan = async (
  _parent: any,
  params: CreateMealPlanParams,
) => {
  const { planId, day } = params;

  const mealPlan = new MealPlan({
    plan: planId,
    day,
  });

  await mealPlan.save();

  await Plan.findByIdAndUpdate(
    planId,
    { $push: { meals: mealPlan.id } },
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

  const plan = await Plan.findById(id);
  await plan?.populate('meals');

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

  const mealPlan = await MealPlan.findById(mealPlanId);
  await mealPlan?.populate('meal');

  return mealPlan;
};
