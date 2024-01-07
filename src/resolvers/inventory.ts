import {
  getInventoryList,
  removeItemFromInventory,
} from '../actions/inventory';

const resolvers = {
  Query: {
    getInventoryList,
  },
  Mutation: {
    removeItemFromInventory,
  },
};

export default resolvers;
