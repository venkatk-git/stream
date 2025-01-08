import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="bg-red-600 text-gray-200 text-xs px-4 py-1.5 rounded-md outline-accent-500 border border-red-500">
      {children}
    </button>
  );
}
