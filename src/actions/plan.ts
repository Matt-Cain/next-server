import { GraphQLError } from 'graphql';
import { Types } from 'mongoose';
import Plan from '../models/plan';

type Context = {
  user: {
    id: Types.ObjectId;
    email: string;
    hash: string;
  };
};

type CreatePlanParams = {
  isPlaceholder: boolean;
  timestamp: Date;
  name: string;
};
export const createPlan = async (
  _parent: any,
  params: CreatePlanParams,
  context: Context,
) => {
  const { user } = context;
  const { isPlaceholder, timestamp, name } = params;

  const plan = new Plan({
    isPlaceholder,
    name,
    timestamp,
    user: user.id,
  });

  await plan.save();

  return plan;
};

export const updatePlan = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;
  const { id, ...rest } = params;

  console.log({ id, ...rest });

  const plan = await Plan.findOneAndUpdate({ _id: id, user: user.id }, rest, {
    new: true,
  });
  console.log({ plan });

  return Boolean(plan);
};

export const deletePlan = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;
  const { id } = params;

  const plan = await Plan.findOneAndDelete({ _id: id, user: user.id });

  if (plan) {
    return true;
  }
  throw new GraphQLError('Could not find plan to delete');
};

export const getPlans = async (_parent: any, params: any, context: Context) => {
  const { user } = context;
  const { startDate, endDate } = params;

  const plans = await Plan.find({
    timestamp: { $gte: startDate, $lte: endDate },
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
  const { user } = context;
  const { id } = params;
  const plan = await Plan.findOne({ _id: id, user: user.id }).populate(
    'entree sides',
  );
  console.log('hello', { plan });

  return plan;
};

export const swapDates = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;
  const { from, to } = params;

  try {
    const updatedFromPlan = await Plan.findOneAndUpdate(
      {
        _id: from.id,
        user: user.id,
      },
      {
        timestamp: to.timestamp,
      },
      { new: true },
    );

    if (!updatedFromPlan) {
      throw new Error();
    }

    if (to.id) {
      const updatedToPlan = await Plan.findOneAndUpdate(
        {
          _id: to.id,
          user: user.id,
        },
        {
          timestamp: from.timestamp,
        },
        { new: true },
      );

      if (!updatedToPlan) {
        throw new Error();
      }
    }

    return true;
  } catch {
    return false;
  }
};
