const mealPlanTypeDefs = `#graphql

  type Ingredient {
    id: ID!
    name: String
    quantity: Int
    unit: String
  }

  type Course {
    id: ID!
    type: String
    name: String
    ingredients: [Ingredient]
  }

  type Meal {
    id: ID!
    name: String
    day: Int
    courses: [Course]
  }

  type Plan {
    id: ID!
    startDate: Date
    endDate: Date
    meals: [Meal]
  }

  type Query {
    meal(id: ID!): Meal
    getPlan(id: ID!): Plan
    getPlans(startDate: Date!, endDate: Date!): [Plan]
  }

  type Mutation {
    createPlan(startDate: Date!, endDate: Date!): Plan
  }

`;

export default mealPlanTypeDefs;