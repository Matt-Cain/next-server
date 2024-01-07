const mealPlanTypeDefs = `#graphql

  type Plan {
    entree: Course
    id: ID!
    isPlaceholder: Boolean
    name: String
    sides: [Course]
    timestamp: Date
  }

  input SwapInput {
    id: ID
    timestamp: Date
  }

  type Query {
    getPlan(id: ID!): Plan
    getPlans(startDate: Date!, endDate: Date!): [Plan]
  }

  type Mutation {
    createPlan(timestamp: Date!, isPlaceholder: Boolean, name: String): Plan

    deletePlan(id: ID!): Boolean

    swapDates(
      from: SwapInput!
      to: SwapInput!
    ): Boolean

    updatePlan(
      entree: ID
      id: ID!
      isPlaceholder: Boolean
      name: String
      sides: [ID]
      timestamp: Date
    ): Boolean
  }

`;

export default mealPlanTypeDefs;
