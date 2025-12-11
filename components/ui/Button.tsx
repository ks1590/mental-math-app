'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = ({ className, variant = 'primary', size = 'md', children, ...props }: ButtonProps) => {
  const variants = {
    primary:
      'bg-yellow-400 hover:bg-yellow-300 text-yellow-900 border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1',
    secondary:
      'bg-sky-400 hover:bg-sky-300 text-white border-b-4 border-sky-600 active:border-b-0 active:translate-y-1',
    outline:
      'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 border-b-4 active:border-b-2 active:translate-y-[2px]',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-3 text-lg font-bold',
    lg: 'px-8 py-4 text-xl font-black',
    xl: 'px-10 py-6 text-3xl font-black',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(
        'rounded-2xl transition-colors outline-none focus:ring-4 ring-offset-2 ring-yellow-200',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
