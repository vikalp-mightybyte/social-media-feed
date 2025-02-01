import { vpc } from './vpc';
import { database } from './db';

export const api = new sst.aws.Function('GraphQLApi', {
  bundle: 'apps/backend/dist',
  handler: 'lambda.handler',
  url: true,
  description: 'GraphQL API endpoint',
  link: [database],
  vpc,
});

// Runs only in dev mode
new sst.x.DevCommand('API:local', {
  link: [database],
  dev: {
    directory: 'apps/backend',
    command: 'yarn dev',
    title: 'GraphQL API: Local',
  },
});
