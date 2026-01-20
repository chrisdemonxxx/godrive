'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import { format, addDays, setHours, setMinutes } from 'date-fns';

// Bangalore areas for autocomplete
const BANGALORE_AREAS = [
  'Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Electronic City',
  'Marathahalli', 'Jayanagar', 'JP Nagar', 'BTM Layout', 'Sarjapur Road',
  'Hebbal', 'Yelahanka', 'Banashankari', 'Malleshwaram', 'Rajajinagar',
  'MG Road', 'Brigade Road', 'Bannerghatta Road', 'Bellandur', 'Domlur'
];

interface SearchBarProps {
  compact?: boolean;
}

export function SearchBar({ compact = false }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  
  // Default dates: today + 1 day for pickup, today + 3 days for return
  const defaultPickup = setMinutes(setHours(addDays(new Date(), 1), 10), 0);
  const defaultReturn = setMinutes(setHours(addDays(new Date(), 3), 10), 0);
  
  const [pickupDate, setPickupDate] = useState(format(defaultPickup, 'yyyy-MM-dd'));
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(format(defaultReturn, 'yyyy-MM-dd'));
  const [returnTime, setReturnTime] = useState('10:00');
  
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.length > 0) {
      const filtered = BANGALORE_AREAS.filter(area => 
        area.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredAreas(filtered);
    } else {
      setFilteredAreas(BANGALORE_AREAS.slice(0, 6));
    }
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    params.set('pickup', `${pickupDate}T${pickupTime}`);
    params.set('return', `${returnDate}T${returnTime}`);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className={cn(
      "w-full",
      compact ? "max-w-4xl" : "max-w-5xl",
      "mx-auto"
    )}>
      <div className={cn(
        "p-1.5 rounded-3xl",
        "bg-white/80 dark:bg-white/5 backdrop-blur-xl",
        "border border-gray-200 dark:border-white/10",
        "shadow-xl dark:shadow-modal"
      )}>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
          {/* Location */}
          <div className="relative flex-1" ref={locationRef}>
            <div
              className={cn(
                "px-5 py-4 rounded-2xl cursor-text",
                "bg-white/50 dark:bg-white/5",
                "hover:bg-white dark:hover:bg-white/10",
                "transition-colors",
                showLocationDropdown && "bg-white dark:bg-white/10"
              )}
              onClick={() => setShowLocationDropdown(true)}
            >
              <div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/40 mb-1.5">
                Location
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary-600 dark:text-accent-cyan flex-shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setShowLocationDropdown(true)}
                  placeholder="Where in Bangalore?"
                  className={cn(
                    "flex-1 bg-transparent outline-none",
                    "text-sm md:text-base font-medium text-gray-900 dark:text-white",
                    "placeholder:text-gray-400 dark:placeholder:text-white/40"
                  )}
                />
                {location && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation('');
                    }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Location Dropdown */}
            {showLocationDropdown && (
              <div className={cn(
                "absolute top-full left-0 right-0 mt-2 z-50",
                "bg-white dark:bg-gray-900 rounded-2xl",
                "border border-gray-200 dark:border-white/10",
                "shadow-xl max-h-64 overflow-y-auto"
              )}>
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((area) => (
                    <button
                      key={area}
                      onClick={() => {
                        setLocation(area);
                        setShowLocationDropdown(false);
                      }}
                      className={cn(
                        "w-full px-4 py-3 text-left",
                        "flex items-center gap-3",
                        "hover:bg-gray-50 dark:hover:bg-white/5",
                        "first:rounded-t-2xl last:rounded-b-2xl",
                        "transition-colors"
                      )}
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{area}, Bangalore</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 dark:text-white/60">
                    No areas found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-10 bg-gray-200 dark:bg-white/10" />

          {/* Pickup Date/Time */}
          <div className="flex-1 px-5 py-4 rounded-2xl bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/40 mb-1.5">
              Pickup
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary-600 dark:text-accent-cyan flex-shrink-0" />
              <div className="flex-1 flex gap-2">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className={cn(
                    "flex-1 bg-transparent outline-none cursor-pointer",
                    "text-sm font-medium text-gray-900 dark:text-white",
                    "[color-scheme:light] dark:[color-scheme:dark]"
                  )}
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className={cn(
                    "w-20 bg-transparent outline-none cursor-pointer",
                    "text-sm font-medium text-gray-900 dark:text-white",
                    "[color-scheme:light] dark:[color-scheme:dark]"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-10 bg-gray-200 dark:bg-white/10" />

          {/* Return Date/Time */}
          <div className="flex-1 px-5 py-4 rounded-2xl bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/40 mb-1.5">
              Return
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-pink-600 dark:text-accent-magenta flex-shrink-0" />
              <div className="flex-1 flex gap-2">
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={pickupDate}
                  className={cn(
                    "flex-1 bg-transparent outline-none cursor-pointer",
                    "text-sm font-medium text-gray-900 dark:text-white",
                    "[color-scheme:light] dark:[color-scheme:dark]"
                  )}
                />
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className={cn(
                    "w-20 bg-transparent outline-none cursor-pointer",
                    "text-sm font-medium text-gray-900 dark:text-white",
                    "[color-scheme:light] dark:[color-scheme:dark]"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <Button
            variant="primary"
            onClick={handleSearch}
            className={cn(
              "w-full lg:w-auto",
              "px-6 md:px-8 py-4",
              "flex items-center justify-center gap-2",
              "shadow-button dark:shadow-button-dark"
            )}
          >
            <Search className="w-5 h-5" />
            <span className="text-sm md:text-base font-semibold">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
