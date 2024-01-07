const courseTypeDefs = `#graphql

  type Ingredient {
    id: ID
    name: String
    quantity: Int
    unit: String
  }

  input IngredientInput {
    id: ID
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

  type Query {
    getCourses: [Course]
    getCourse(id: ID!): Course
  }

  type Mutation {
    createCourse(
      type: CourseType!
      name: String!
      recipe: String
      ingredients: [IngredientInput]!
    ): Course

    updateCourse(
      id: ID!
      type: CourseType
      name: String
      recipe: String
      ingredients: [IngredientInput]
    ): Course

    deleteCourse(id: ID!): Boolean
  }
`;

export default courseTypeDefs;
