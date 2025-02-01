'use client';

import type { Post } from '@/__generated__/graphql';
import { Heart } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLike?: () => void;
}

export function PostCard({ post, onLike }: PostCardProps) {
  const { title, content, createdAt, likesCount = 0, isLiked } = post;
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
        {onLike && (
          <button
            onClick={onLike}
            className="flex cursor-pointer items-center space-x-1 text-pink-500 hover:text-pink-600 transition-colors duration-200"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">{likesCount}</span>
          </button>
        )}
      </div>
    </div>
  );
}
