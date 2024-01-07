import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
import initiateDB from './db/initiate';
import { getPort } from './utils/port';

import { context } from './auth/context';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

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
  listen: { port: getPort() },
});

console.log(`🚀  Server ready at: ${url}`);
