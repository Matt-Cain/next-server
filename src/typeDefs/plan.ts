const mealPlanTypeDefs = `#graphql

  type Ingredient {
    name: String
    quantity: Int
    unit: String
  }

  enum CourseType {
    side
    entree
  }

  type Course {
    id: ID!
    type: CourseType
    name: String
    recipe: String
    ingredients: [Ingredient]
  }

  type Meal {
    id: ID!
    name: String
    entree: Course
    sides: [Course]
  }

  type MealPlan {
    id: ID!
    day: Int
    meal: Meal
    placeholder: String
  }

  type Plan {
    id: ID!
    startDate: Date
    endDate: Date
    mealPlans: [MealPlan]
  }

  type Query {
    getMealPlan(mealPlanId: ID!): MealPlan
    getPlan(id: ID!): Plan
    getPlans(startDate: Date!, endDate: Date!): [Plan]
    getCourses: [Course]
    getCourse(id: ID!): Course
    getMeal(id: ID!): Meal
  }

  input IngredientInput {
    name: String
    quantity: Int
    unit: String
  }

  type Mutation {
    createPlan(startDate: Date!, endDate: Date!): Plan
    createMealPlan(planId: ID!, day: Int!, placeholder: String): MealPlan
    createCourse(
      type: CourseType!
      name: String!
      recipe: String
      ingredients: [IngredientInput]!
    ): Course
    createMeal(
      mealPlanId: ID!
      name: String!
      entree: ID!
      sides: [ID]!
    ): Meal
    updateCourse(
      id: ID!
      type: CourseType
      name: String
      recipe: String
      ingredients: [IngredientInput]
    ): Course
    updateMeal(
      id: ID!
      name: String
      entree: ID
      sides: [ID]
    ): Boolean

    deleteCourse(id: ID!): Boolean
  }
`;

export default mealPlanTypeDefs;
