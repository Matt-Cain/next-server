const shoppingTypeDefs = `#graphql

  type Query {
    getShoppingList(startDate: Date!, endDate: Date!): [Ingredient]
  }

`;

export default shoppingTypeDefs;
