import { gql } from '@/__generated__';
import { PaginatedFeedResult, Post } from '@/__generated__/graphql';
import { useMutation } from '@apollo/client';

const CREATE_POST_MUTATION = gql(`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      content
      createdAt
    }
  }
`);

const NEW_POST_FRAGMENT = gql(`
  fragment NewPost on Post {
    id
    title
    content
    createdAt
  }
`);

export function useCreatePost() {
  return useMutation(CREATE_POST_MUTATION, {
    optimisticResponse({ input }) {
      const newPost: Post = {
        id: `temp-id-${Math.random()}-${Date.now()}`,
        title: input.title,
        content: input.content,
        createdAt: new Date().toISOString(),
        __typename: 'Post',
      };

      return {
        createPost: newPost,
      };
    },
    update(cache, { data }) {
      cache.modify<{
        feed: PaginatedFeedResult;
      }>({
        fields: {
          feed(existingFeed, { readField }) {
            const newPostRef = cache.writeFragment({
              data: data?.createPost,
              fragment: NEW_POST_FRAGMENT,
            });
            if (!newPostRef) return existingFeed;

            const existingItems =
              readField<PaginatedFeedResult['items']>('items', existingFeed) ||
              [];

            if (
              existingItems.some(
                (ref) => readField('id', ref) === readField('id', newPostRef)
              )
            ) {
              return existingFeed;
            }

            const items = [
              newPostRef,
              ...existingItems,
            ] as never as PaginatedFeedResult['items'];

            return {
              ...existingFeed,
              items: items,
            };
          },
        },
      });
    },
  });
}
