'use client';

import { Sparkles } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { cn } from '@/lib/utils/cn';

export function HeroSection() {
  return (
    <section className={cn(
      "relative min-h-[calc(100vh-4rem)]",
      "flex items-center justify-center",
      "pt-20 pb-32 px-4 sm:px-6 lg:px-8"
    )}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center space-y-8 mb-12">
          {/* Badge */}
          <div className={cn(
            "inline-flex items-center gap-2 px-5 py-2 rounded-full",
            "bg-primary-50 dark:bg-accent-cyan/10",
            "border border-primary-200 dark:border-accent-cyan/20",
            "mb-6"
          )}>
            <Sparkles className="w-4 h-4 text-primary-600 dark:text-accent-cyan" />
            <span className="text-sm font-medium text-primary-600 dark:text-accent-cyan">
              Premium Self-Drive Experience
            </span>
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              "bg-green-500 animate-pulse"
            )} />
          </div>

          {/* Headline */}
          <h1 className={cn(
            "text-5xl md:text-6xl lg:text-7xl font-bold leading-tight",
            "tracking-tight"
          )}>
            <span className="text-gray-900 dark:text-white">Drive </span>
            <span className="gradient-text">Extraordinary</span>
          </h1>

          {/* Subheadline */}
          <p className={cn(
            "text-lg md:text-xl max-w-2xl mx-auto",
            "text-gray-600 dark:text-white/70",
            "leading-relaxed"
          )}>
            Access the world's most exclusive vehicles. Premium hosts, instant booking, 
            and a driving experience unlike any other.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

