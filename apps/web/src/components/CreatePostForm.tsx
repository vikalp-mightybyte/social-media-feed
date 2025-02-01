'use client';

import { useCreatePost } from '@/data-access';
import { useState } from 'react';

interface CreatePostFormProps {
  onSuccess: () => void;
}

export default function CreatePostForm({ onSuccess }: CreatePostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createPost, { loading }] = useCreatePost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPost({
      variables: {
        input: { title, content },
      },
      onCompleted: onSuccess,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          rows={3}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300"
      >
        Create Post
      </button>
    </form>
  );
}
