'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CreatePostForm } from '../CreatePostForm';
import { Modal } from '@/components/ui/Modal';

export function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed cursor-pointer bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors duration-200"
      >
        <Plus className="w-6 h-6" />
      </button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Create a New Post"
      >
        <CreatePostForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
