'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={`mt-1 p-2 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${props.className || ''}`}
      />
    );
  }
);

Input.displayName = 'Input';
