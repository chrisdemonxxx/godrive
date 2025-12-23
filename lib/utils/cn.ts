import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge classNames with Tailwind CSS
 * Combines clsx and tailwind-merge for optimal className merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

