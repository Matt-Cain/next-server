import { getShoppingList, addItemToInventory } from '../actions/shopping';

const resolvers = {
  Query: {
    getShoppingList,
  },
  Mutation: {
    addItemToInventory,
  },
};

export default resolvers;
