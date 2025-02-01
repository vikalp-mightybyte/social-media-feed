import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { setContext } from '@apollo/client/link/context';
import { fetchAuthSession } from 'aws-amplify/auth';

if (process.env.NODE_ENV === 'development') {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  try {
    // Get the current authenticated session
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.error('Error getting auth token:', error);
    return {
      headers,
    };
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
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
