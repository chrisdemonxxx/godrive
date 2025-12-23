'use client';

import { useState } from 'react';
import { MapPin, Calendar, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

interface SearchBarProps {
  initialLocation?: string;
  initialStartDate?: string;
  initialEndDate?: string;
  showFilters?: boolean;
  onShowFiltersToggle?: () => void;
  compact?: boolean;
}

export function SearchBar({
  initialLocation = 'Koramangala, Bangalore',
  initialStartDate = 'Dec 24, 10:00 AM',
  initialEndDate = 'Dec 26, 10:00 AM',
  showFilters = false,
  onShowFiltersToggle,
  compact = false,
}: SearchBarProps) {
  const [location, setLocation] = useState(initialLocation);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  return (
    <div className={cn(
      "w-full",
      compact ? "max-w-4xl" : "max-w-5xl",
      "mx-auto"
    )}>
      <div className={cn(
        "p-1.5 rounded-3xl",
        "bg-white/50 dark:bg-white/5 backdrop-blur-xl",
        "border border-gray-200 dark:border-white/10",
        "shadow-xl dark:shadow-modal"
      )}>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
          {/* Location */}
          <button
            className={cn(
              "flex-1 px-5 py-4 rounded-2xl",
              "bg-white/50 dark:bg-white/5",
              "hover:bg-white dark:hover:bg-white/10",
              "transition-colors text-left"
            )}
          >
            <div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/40 mb-1.5">
              Location
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary-600 dark:text-accent-cyan" />
              <span className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                {location}
              </span>
            </div>
          </button>

          {/* Divider */}
          <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-white/10" />

          {/* Pickup */}
          <button
            className={cn(
              "flex-1 px-5 py-4 rounded-2xl",
              "bg-white/50 dark:bg-white/5",
              "hover:bg-white dark:hover:bg-white/10",
              "transition-colors text-left"
            )}
          >
            <div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/40 mb-1.5">
              Pickup
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary-600 dark:text-accent-cyan" />
              <span className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                {startDate}
              </span>
            </div>
          </button>

          {/* Divider */}
          <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-white/10" />

          {/* Return */}
          <button
            className={cn(
              "flex-1 px-5 py-4 rounded-2xl",
              "bg-white/50 dark:bg-white/5",
              "hover:bg-white dark:hover:bg-white/10",
              "transition-colors text-left"
            )}
          >
            <div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/40 mb-1.5">
              Return
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-pink-600 dark:text-accent-magenta" />
              <span className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                {endDate}
              </span>
            </div>
          </button>

          {/* Filter Button */}
          {onShowFiltersToggle && (
            <>
              <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-white/10" />
              <button
                onClick={onShowFiltersToggle}
                className={cn(
                  "w-12 h-12 md:w-14 md:h-14 rounded-2xl",
                  "border transition-all",
                  "flex items-center justify-center",
                  showFilters
                    ? "border-primary-600 dark:border-accent-cyan bg-primary-50 dark:bg-accent-cyan/10"
                    : "border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10"
                )}
              >
                <SlidersHorizontal className={cn(
                  "w-5 h-5",
                  showFilters 
                    ? "text-primary-600 dark:text-accent-cyan" 
                    : "text-gray-600 dark:text-white/60"
                )} />
              </button>
            </>
          )}

          {/* Search Button */}
          <Link href="/search">
            <Button
              variant="primary"
              className={cn(
                "w-full md:w-auto",
                "px-6 md:px-8 py-4",
                "flex items-center justify-center gap-2",
                "shadow-button dark:shadow-button-dark"
              )}
            >
              <Search className="w-5 h-5" />
              <span className="text-sm md:text-base font-semibold">Search</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

