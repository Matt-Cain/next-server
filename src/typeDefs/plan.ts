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
    courses: [Course]
  }

  type MealPlan {
    id: ID!
    day: Int
    meal: Meal
  }

  type Plan {
    id: ID!
    startDate: Date
    endDate: Date
    meals: [MealPlan]
  }

  type Query {
    getMeal(mealPlanId: ID!): MealPlan
    getPlan(id: ID!): Plan
    getPlans(startDate: Date!, endDate: Date!): [Plan]
  }

  type Mutation {
    createPlan(startDate: Date!, endDate: Date!): Plan
    createMealPlan(planId: ID!, day: Int!): MealPlan
  }
`;

export default mealPlanTypeDefs;