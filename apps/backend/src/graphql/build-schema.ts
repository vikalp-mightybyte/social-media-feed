import { resolve } from 'path';
import { buildSchema as buildGqlSchema } from 'type-graphql';
// import { authChecker } from './services/auth-service'
// import { SubscriptionService } from './services/subscription-service'
import { once } from '../utils/once';
import { resolvers } from './resolvers';

export const buildSchema = once(() =>
  buildGqlSchema({
    // resolvers: [resolve(__dirname + '/graphql/**/*resolver.{ts,js}')],
    // pubSub: SubscriptionService.getPubSub(),
    // authChecker,
    resolvers,
    validate: true,
    // emitSchemaFile: {
    //   path: resolve(__dirname, '..', 'schema.gql'),
    //   sortedSchema: true,
    //   // commentDescriptions: true,
    // },
  })
);
