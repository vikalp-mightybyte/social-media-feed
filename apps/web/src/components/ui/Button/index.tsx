'use client';

import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', ...props }, ref) => {
    const baseStyles = 'cursor-pointer px-4 py-2 rounded transition-colors duration-200 disabled:opacity-50';
    const variantStyles = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100'
    };

    return (
      <button
        {...props}
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      />
    );
  }
);

Button.displayName = 'Button';
