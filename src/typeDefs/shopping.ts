const shoppingTypeDefs = `#graphql

  type Query {
    getShoppingList(startDate: Date!, endDate: Date!): [Ingredient]
  }

  type Mutation {
    addItemToInventory(
      id: ID!
      type: String!
      timestamp: Date!
      status: String!
    ): Boolean
  }
`;

export default shoppingTypeDefs;
