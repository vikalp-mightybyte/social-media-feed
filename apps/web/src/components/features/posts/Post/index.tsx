'use client';

import type { Post as PostType } from '@/__generated__/graphql';
import { PostCard } from '@/components/ui/PostCard';
import { useLikePost } from '@/data-access/useLikePost';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [likePost] = useLikePost();

  const handleLike = async () => {
    try {
      await likePost({
        variables: {
          input: {
            postId: post.id,
            isLiked: !post.isLiked,
          },
        },
      });
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  return <PostCard post={post} onLike={handleLike} />;
}
