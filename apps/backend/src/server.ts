import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { buildSchema } from './graphql/build-schema';
import {Resource} from 'sst'

export async function createServer() {

  // console.log("Resource: ", Resource.DB.username);
  


  const schema = await buildSchema();

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    cors(),
    express.json({ limit: '50mb' }),
    expressMiddleware(
      server
      // { context: contextProvider }
    )
  );

  return {
    app,
    http: httpServer,
    start: async ({ port }: { port: number }) => {
      await new Promise<void>((resolve) => {
        httpServer.listen({ port }, resolve);
      });
    },
    stop: async () => {
      await server.stop();
      httpServer.close();
    },
  };
}
