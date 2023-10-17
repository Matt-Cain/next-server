import Plan from "@/models/plan";
import MealPlan from "@/models/mealPlan";

export const createPlan = async (_parent, params, context) => {
  const { startDate, endDate } = params;
  const { user } = context;

  const plan = new Plan({
    startDate,
    endDate,
    user: user.id
  });

  await plan.save();

  return plan;
};

export const createMealPlan = async (_parent, params, context) => {
  const { planId, day } = params;

  const mealPlan = new MealPlan({
    plan: planId,
    day
  });

  await mealPlan.save();

  await Plan.findByIdAndUpdate(
    planId,
    { $push: { meals: mealPlan.id } },
    { new: true }
  );

  return mealPlan;
}

export const getPlans = async (_parent, params, context) => {
  const { user } = context;
  const { startDate, endDate } = params;

  const plans = await Plan.find({
    startDate: { $gte: startDate },
    endDate: { $lte: endDate },
    user: user.id
  });

  return plans;
}

export const getPlan = async (_parent, params, context) => {
  const { user } = context;
  const { id } = params;

  const plan = await Plan.findById(id);
  await plan.populate('meals');

  return plan;
}

export const getMeal = async (_parent, params, context) => {
  const { user } = context;
  const { mealPlanId } = params;

  const mealPlan = await MealPlan.findById(mealPlanId);
  await mealPlan.populate('meals');

  console.log({ mealPlanId, mealPlan });

  return mealPlan;
}
