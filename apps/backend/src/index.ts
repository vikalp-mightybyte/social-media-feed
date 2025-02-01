import 'reflect-metadata';
import { createServer } from './server';
import config from './config/config';

async function bootstrap() {
  const server = await createServer();
  await server.start({ port: config.API_SERVER_PORT });

  console.log(
    `🚀 Server is running at http://localhost:${config.API_SERVER_PORT}`
  );
}

bootstrap().catch(console.error);
