import { GraphQLError } from 'graphql';
import { Types } from 'mongoose';
import Plan from '../models/plan';
import Course from '../models/course';
import Inventory from '../models/inventory';

type Context = {
  user: {
    id: Types.ObjectId;
    email: string;
    hash: string;
  };
};

const SHOPPING_ITEM_TYPES = {
  shopping: 'shoppingItems',
  ingredient: 'ingredients',
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
  }).populate({
    path: 'entree',
    populate: {
      path: 'ingredients',
    },
  });

  const unorderedIngredients = plans.reduce((acc, plan) => {
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

  const inventory = await Inventory.findOne({
    timestamp: { $gte: startDate, $lte: endDate },
    user: user.id,
  });

  const inventoryIngredients = inventory?.ingredients || [];

  const filteredIngredients = unorderedIngredients.filter(
    (ingredient: any) =>
      !inventoryIngredients.find(({ item }) => {
        return item?.equals(ingredient._id);
      }),
  );

  const sortedIngredients = filteredIngredients.sort((a, b) => {
    if (a.name < b.name) return -1;
    return 1;
  });

  return sortedIngredients;
};

type AddItemToInventoryParams = {
  id: Types.ObjectId;
  type: keyof typeof SHOPPING_ITEM_TYPES;
  timestamp: Date;
  status: string;
};

export const addItemToInventory = async (
  _parent: any,
  params: AddItemToInventoryParams,
  context: Context,
) => {
  const { user } = context;
  const { id, type, timestamp, status } = params;

  const keyType = SHOPPING_ITEM_TYPES[type];

  const inventory = await Inventory.findOneAndUpdate(
    { user: user.id, timestamp },
    {
      $push: {
        [keyType]: { item: id, type: keyType, status },
      },
    },
    { new: true, upsert: true },
  );

  return Boolean(inventory);
};
