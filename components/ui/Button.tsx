'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary-600 dark:bg-gradient-primary text-white hover:bg-primary-700 dark:hover:opacity-90 focus:ring-primary-500 dark:focus:ring-accent-cyan shadow-lg shadow-primary-200 dark:shadow-button-dark hover:shadow-xl hover:shadow-primary-300 dark:hover:shadow-button-dark-hover",
      secondary: "bg-gray-900 dark:bg-white/10 text-white hover:bg-gray-800 dark:hover:bg-white/20 focus:ring-gray-500 dark:focus:ring-white/30",
      outline: "border-2 border-primary-600 dark:border-accent-cyan text-primary-600 dark:text-accent-cyan hover:bg-primary-50 dark:hover:bg-white/5 hover:border-primary-700 dark:hover:border-accent-cyanLight focus:ring-primary-500 dark:focus:ring-accent-cyan",
      ghost: "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 focus:ring-gray-500 dark:focus:ring-white/30",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600",
    };
    
    const sizes = {
      sm: "text-sm px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2",
      xl: "text-lg px-8 py-4 gap-3",
    };
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

