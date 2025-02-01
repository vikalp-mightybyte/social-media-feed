import type { Post as PostType } from '@/lib/mockData';
import { Heart } from 'lucide-react';

interface PostProps {
  post: PostType;
  onLike: () => void;
}

export default function Post({ post, onLike }: PostProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">
        {post.title}
      </h2>
      <p className="text-gray-600 mb-4">{post.content}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={onLike}
          className="flex cursor-pointer items-center space-x-1 text-pink-500 hover:text-pink-600 transition-colors duration-200"
        >
          <Heart className="w-5 h-5" />
          <span>{post.likes}</span>
        </button>
      </div>
    </div>
  );
}
