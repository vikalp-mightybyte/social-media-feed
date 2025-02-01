import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import type { Post } from '@/lib/mockData';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedPosts = await api.getPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch posts: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async (title: string, content: string) => {
    try {
      const newPost = await api.createPost(title, content);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      return newPost;
    } catch (err) {
      setError('Failed to create post');
      throw err;
    }
  };

  const likePost = async (id: string) => {
    try {
      const updatedLikes = await api.likePost(id);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, likes: updatedLikes } : post
        )
      );
      return updatedLikes;
    } catch (err) {
      setError('Failed to like post');
      throw err;
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    likePost,
    refetchPosts: fetchPosts,
  };
}
