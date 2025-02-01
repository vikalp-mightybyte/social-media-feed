import { vpc } from './vpc';
import { database } from './db';

export const migration = new sst.aws.Function('Migration', {
  bundle: 'apps/backend/dist',
  handler: 'migrate.handler',
  link: [database],
  vpc,
});
