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

  type MealPlan {
    id: ID!
    range: [String]
    meals: [Meal]
  }

  type Query {
    meal(id: ID!): Meal
    mealPlan(id: ID!): MealPlan
    mealPlans: [MealPlan]
  }

`;

export default mealPlanTypeDefs;