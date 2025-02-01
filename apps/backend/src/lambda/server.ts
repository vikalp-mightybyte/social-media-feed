import 'reflect-metadata';
import serverless from 'serverless-http';
import { createServer } from '../server';
import { once } from '../utils/once';

const getHandler = once(async (): Promise<serverless.Handler> => {
  const server = await createServer();
  return serverless(server.app);
});

export const handler = async (event: Event) => {
  const handler = await getHandler();

  return handler(event, {});
};
