const authTypeDefs = `#graphql

  """
  " User type - note that we don't expose the hash
  """
  type User {
    id: ID!
    username: String!
    nickname: String!
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
    login(username: String!, password: String!): Tokens
  }

`;

export default authTypeDefs;
