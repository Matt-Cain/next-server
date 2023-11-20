import { getShoppingList } from '../actions/shopping';

const resolvers = {
  Query: {
    getShoppingList,
  },
};

export default resolvers;
