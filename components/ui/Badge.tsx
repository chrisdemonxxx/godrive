'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'premium';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-full";
    
    const variants = {
      default: "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white",
      success: "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400",
      warning: "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
      error: "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400",
      info: "bg-blue-100 dark:bg-accent-cyan/20 text-blue-700 dark:text-accent-cyan",
      premium: "bg-gradient-premium text-white dark:text-white shadow-glow-gold",
    };
    
    const sizes = {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-2.5 py-1",
      lg: "text-base px-3 py-1.5",
    };
    
    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

