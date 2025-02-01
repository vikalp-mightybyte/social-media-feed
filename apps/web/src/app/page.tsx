'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/data-access';
import { Authenticator } from '@aws-amplify/ui-react';
import { configureAWSAmplify } from '@/auth/aws';
import { Feed } from '@/components/features/posts/Feed';
import { CreatePostButton } from '@/components/features/posts/CreatePostButton';

configureAWSAmplify();
const queryClient = new QueryClient();

export default function Home() {
  return (
    <Authenticator>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <main className="mx-auto p-4 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
              Social Media Mini-Feed
            </h1>
            <Feed />
            <CreatePostButton />
          </main>
        </QueryClientProvider>
      </ApolloProvider>
    </Authenticator>
  );
}
