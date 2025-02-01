import { resolve } from 'path';
import { buildSchema as buildGqlSchema } from 'type-graphql';
import { authChecker } from './auth-checker';
import { once } from '../utils/once';
import { resolvers } from './resolvers';

export const buildSchema = once(() =>
  buildGqlSchema({
    resolvers,
    authChecker,
    validate: true,
    emitSchemaFile: {
      path: resolve(__dirname, '..', 'schema.gql'),
      sortedSchema: true,
      // commentDescriptions: true,
    },
  })
);
