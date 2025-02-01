'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Post from '@/components/Post';
import type { Post as PostType } from '@/lib/mockData';
import { useFeed } from '@/data-access/useFeed';

export default function Feed() {
  // const queryClient = useQueryClient();

  // const {
  //   data: posts,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: api.getPosts,
  // });

  // const likeMutation = useMutation({
  //   mutationFn: api.likePost,
  //   onMutate: async (postId) => {
  //     await queryClient.cancelQueries({ queryKey: ['posts'] });
  //     const previousPosts = queryClient.getQueryData<PostType[]>(['posts']);
  //     queryClient.setQueryData<PostType[]>(['posts'], (old) =>
  //       old?.map((post) =>
  //         post.id === postId ? { ...post, likes: post.likes + 1 } : post
  //       )
  //     );
  //     return { previousPosts };
  //   },
  //   onError: (err, newPost, context) => {
  //     queryClient.setQueryData(['posts'], context?.previousPosts);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ['posts'] });
  //   },
  // });

  const { data, loading, error } = useFeed({ limit: 10 });

  if (loading) {
    return <div className="text-center text-black">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  const posts = data?.feed?.items;

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {posts?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}
