import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/', // todo: use real backend url, coming from SST.
  cache: new InMemoryCache(),
});
