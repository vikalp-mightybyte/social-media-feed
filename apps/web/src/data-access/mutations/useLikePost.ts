import { gql, useMutation } from '@apollo/client';
import { Post } from '@/__generated__/graphql';

const LIKE_POST = gql`
  mutation LikePost($input: LikePostInput!) {
    likePost(input: $input) {
      id
      title
      content
      createdAt
      userId
      likesCount
      isLiked
    }
  }
`;

export const useLikePost = () => {
  return useMutation<
    { likePost: Post },
    { input: { postId: string; isLiked: boolean } }
  >(LIKE_POST, {
    update(cache, { data }) {
      if (!data) return;

      // Update the post in the cache
      cache.modify({
        id: cache.identify({ __typename: 'Post', id: data.likePost.id }),
        fields: {
          likesCount: () => data.likePost.likesCount,
          isLiked: () => data.likePost.isLiked,
        },
      });
    },
  });
};
