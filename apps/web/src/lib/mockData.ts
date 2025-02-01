export interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  createdAt: string;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the content of the first post.',
    likes: 5,
    createdAt: '2025-01-30T10:00:00Z',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is the content of the second post.',
    likes: 3,
    createdAt: '2025-01-30T11:00:00Z',
  },
];
