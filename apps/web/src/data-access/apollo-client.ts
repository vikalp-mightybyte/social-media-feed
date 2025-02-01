import { ApolloClient, InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

if (process.env.NODE_ENV === 'development') {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            keyArgs: ['limit', 'next'],
            merge(existing = { items: [], next: null }, incoming) {
              return {
                items: [...existing.items, ...incoming.items],
                next: incoming.next,
              };
            },
          },
        },
      },
    },
  }),
});
