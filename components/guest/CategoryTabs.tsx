'use client';

import { Sparkles, Crown, Car, Zap, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: Category[] = [
  { id: 'all', name: 'All', icon: Sparkles },
  { id: 'luxury', name: 'Luxury', icon: Crown },
  { id: 'suv', name: 'SUV', icon: Car },
  { id: 'electric', name: 'Electric', icon: Zap },
  { id: 'sports', name: 'Sports', icon: Gauge },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export function CategoryTabs({ activeCategory, onCategoryChange, className }: CategoryTabsProps) {
  return (
    <div className={cn("flex gap-2 md:gap-3 overflow-x-auto pb-2 no-scrollbar", className)}>
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "px-4 md:px-6 py-2 md:py-3 rounded-xl",
              "font-semibold text-sm md:text-base",
              "flex items-center gap-2",
              "whitespace-nowrap",
              "transition-all duration-300",
              isActive
                ? "bg-gradient-primary text-white shadow-button dark:shadow-button-dark"
                : "bg-white dark:bg-white/5 text-gray-700 dark:text-white/70 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
            )}
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5" />
            {category.name}
          </button>
        );
      })}
    </div>
  );
}

