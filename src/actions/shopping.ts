import { GraphQLError } from 'graphql';
import { Types } from 'mongoose';
import Plan from '../models/plan';
import Course from '../models/course';

type Context = {
  user: {
    id: Types.ObjectId;
    email: string;
    hash: string;
  };
};

export const getShoppingList = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;
  const { startDate, endDate } = params;

  const plans = await Plan.find({
    timestamp: { $gte: startDate, $lte: endDate },
    user: user.id,
  }).populate('entree sides');

  const unorderedPlans = plans.reduce((acc, plan) => {
    if (plan?.entree instanceof Course) {
      acc.push(...plan.entree.ingredients);
    }

    plan?.sides.forEach((side: any) => {
      if (side instanceof Course) {
        acc.push(...side.ingredients);
      }
    });
    return acc;
  }, [] as any[]);

  const sortedPlans = unorderedPlans.sort((a, b) => {
    if (a.name < b.name) return -1;
    return 1;
  });

  return sortedPlans;
};
