import Plan from "@/models/plan";
import MealPlan from "@/models/mealPlan";
import { Types } from "mongoose";

type Context = {
  user: {
    id: Types.ObjectId;
    email: string;
    hash: string;
  };
};

type createPlanParams = {
  startDate: string;
  endDate: string;
};
export const createPlan = async (
  _parent: any,
  params: createPlanParams,
  context: Context
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

type createMealPlanParams = {
  planId: string;
  day: string;
};
export const createMealPlan = async (
  _parent: any,
  params: createMealPlanParams
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
    { new: true }
  );

  return mealPlan;
};

type addMealToPlanParams = {
  startDate: string;
  endDate: string;
};
export const getPlans = async (
  _parent: any,
  params: addMealToPlanParams,
  context: Context
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

type getPlansParams = {
  id: string;
};
export const getPlan = async (
  _parent: any,
  params: getPlansParams,
  context: Context
) => {
  const { id } = params;

  const plan = await Plan.findById(id);
  await plan?.populate("meals");

  return plan;
};

type getMealParams = {
  mealPlanId: string;
};
export const getMeal = async (
  _parent: any,
  params: getMealParams,
  context: Context
) => {
  const { mealPlanId } = params;

  const mealPlan = await MealPlan.findById(mealPlanId);
  await mealPlan?.populate("meals");

  return mealPlan;
};
