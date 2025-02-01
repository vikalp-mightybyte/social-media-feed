import { type Post, mockPosts } from './mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  getPosts: async (): Promise<Post[]> => {
    await delay(500);
    return [...mockPosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  createPost: async (title: string, content: string): Promise<Post> => {
    await delay(500);
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    mockPosts.unshift(newPost);
    return newPost;
  },

  likePost: async (id: string): Promise<number> => {
    await delay(500);
    const post = mockPosts.find((p) => p.id === id);
    if (post) {
      post.likes += 1;
      return post.likes;
    }
    throw new Error('Post not found');
  },
};
