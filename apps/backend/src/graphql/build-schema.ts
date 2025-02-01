import { resolve } from 'path';
import { buildSchema as buildGqlSchema } from 'type-graphql';
import { authChecker } from './auth-checker';
import { once } from '../utils/once';
import { resolvers } from './resolvers';

const isDevelopment = process.env.NODE_ENV === 'development';

export const buildSchema = once(() =>
  buildGqlSchema({
    resolvers,
    authChecker,
    validate: true,
    emitSchemaFile: isDevelopment
      ? {
          path: resolve(__dirname, '..', 'schema.gql'),
          sortedSchema: true,
          // commentDescriptions: true,
        }
      : false,
  })
);
