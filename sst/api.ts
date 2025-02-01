import { vpc } from './vpc';
import { databaseUrl } from './db';
import { cognitoWebClient, cognitoUserPool } from './auth';

export const api = new sst.aws.Function('GraphQLApi', {
  bundle: 'apps/backend/dist',
  handler: 'lambda.handler',
  url: true,
  vpc,
  description: 'GraphQL API endpoint',
  environment: {
    DATABASE_URL: databaseUrl,
    COGNITO_USER_POOL_ID: cognitoUserPool.id,
    COGNITO_WEB_CLIENT_ID: cognitoWebClient.id,
  },
});

// Runs only in dev mode
new sst.x.DevCommand('API:local', {
  dev: {
    directory: 'apps/backend',
    command: 'yarn dev',
    title: 'GraphQL API: Local',
  },
  environment: {
    DATABASE_URL: databaseUrl,
    COGNITO_USER_POOL_ID: cognitoUserPool.id,
    COGNITO_WEB_CLIENT_ID: cognitoWebClient.id,
  },
});
