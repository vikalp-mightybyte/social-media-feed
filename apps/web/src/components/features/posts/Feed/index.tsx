'use client';

import { Post } from '@/components/features/posts/Post';
import { useFeed } from '@/data-access/queries';

export function Feed() {
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
      {posts?.length === 0 && (
        <div className="text-center text-black">No posts found.</div>
      )}

      {posts?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}
