const authTypeDefs = `#graphql

  type User {
    id: ID!
    email: String!
  }

  type Tokens {
    id: ID!
    accessToken: String
    refreshToken: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Tokens
    signUp(email: String!, password: String!): Tokens
  }

`;

export default authTypeDefs;
