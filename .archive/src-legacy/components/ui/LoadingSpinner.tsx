import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils';

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 'md',
  text,
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (text) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12', className)} {...props}>
        <Loader2 className={cn(sizeClasses[size], 'animate-spin text-primary-600')} />
        <p className="mt-4 text-gray-500">{text}</p>
      </div>
    );
  }

  return (
    <Loader2
      className={cn(
        sizeClasses[size],
        'animate-spin text-primary-600',
        className
      )}
      {...props}
    />
  );
};
