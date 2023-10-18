import { ApolloServer } from "@apollo/server";
import {
  startStandaloneServer,
  StartStandaloneServerOptions,
} from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import dotenv from "dotenv";
import initiateDB from "./db/initiate";
import { ContextFunction } from "@apollo/server";
import { Types } from "mongoose";

import { context } from "./auth/context";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

dotenv.config();
initiateDB();

type User = { id: Types.ObjectId; email: string; hash: string };
interface AuthContext {
  user?: User | any;
}

const server = new ApolloServer<AuthContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context,
  listen: { port: parseInt(process.env.PORT as string) },
});

console.log(`🚀  Server ready at: ${url}`);
