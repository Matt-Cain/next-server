import { ApolloServer } from "@apollo/server";
import { startStandaloneServer,  } from "@apollo/server/standalone";
import { GraphQLError } from 'graphql';
import dotenv from "dotenv";

import { context } from "./auth/context";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context,
  listen: { port: parseInt(process.env.PORT) },
});

console.log(`🚀  Server ready at: ${url}`);
