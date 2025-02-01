import 'reflect-metadata';
import { createServer } from './server';

async function bootstrap() {
  const PORT = 4000;

  const server = await createServer();
  await server.start({ port: PORT });

  console.log(`🚀 Server is running at http://localhost:${PORT}`);
}

bootstrap().catch(console.error);
