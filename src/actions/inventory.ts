import { Types } from 'mongoose';
import Inventory from '../models/inventory';
import ShoppingItem from '../models/item';

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

export const getInventoryList = async (
  _parent: any,
  params: any,
  context: Context,
) => {
  const { user } = context;
  const { startDate, endDate } = params;

  const inventory = await Inventory.findOne({
    timestamp: { $gte: startDate, $lte: endDate },
    user: user.id,
  })
    .populate({
      path: 'ingredients.item',
    })
    .populate({
      path: 'shoppingItems.item',
    })
    .exec();

  console.log(inventory?.ingredients);
  return inventory;
};

export const removeItemFromInventory = async (
  _parent: any,
  params: {
    id: any;
    type: 'ingredient' | 'shopping';
    timestamp: Date;
  },
  context: Context,
) => {
  const { user } = context;
  const { id, type, timestamp } = params;

  const inventory = await Inventory.findOne({
    user: user.id,
    timestamp,
  }).populate({
    path: 'ingredients.item',
  });

  if (!inventory) {
    throw new Error('Inventory not found');
  }

  const itemArray =
    inventory[type === 'ingredient' ? 'ingredients' : 'shoppingItems'];

  const updatedItemArray = itemArray.filter(
    ({ item }) => item?.id?.toString() !== id,
  );

  inventory[type === 'ingredient' ? 'ingredients' : 'shoppingItems'] =
    updatedItemArray;

  const updatedInventory = await inventory.save();

  return Boolean(updatedInventory);
};
