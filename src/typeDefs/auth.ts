const authTypeDefs = `#graphql

  """
  " User type - note that we don't expose the hash
  """
  type User {
    id: ID!
    email: String!
  }

  """
  JWT tokens
  """
  type Tokens {
    """
    id is the id of the associated user
    """
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
