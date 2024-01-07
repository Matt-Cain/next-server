const inventoryTypeDefs = `#graphql

type InventoryItem {
    item: Ingredient!
    type: String!
    status: String!
  }

  type Inventory {
    timestamp: Date!
    ingredients: [InventoryItem]
    shoppingItems: [InventoryItem]
  }

  type Query {
    getInventoryList(startDate: Date!, endDate: Date!): Inventory
  }

  type Mutation {
    addItemToInventory(
      id: ID!
      type: String!
      timestamp: Date!
      status: String!
    ): Boolean

    removeItemFromInventory(
      id: ID!
      type: String!
      timestamp: Date!
    ): Boolean
  }
`;

export default inventoryTypeDefs;
