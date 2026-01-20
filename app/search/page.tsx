'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GuestNavbar } from '@/components/layout/GuestNavbar';
import { GuestFooter } from '@/components/layout/GuestFooter';
import { SearchBar } from '@/components/guest/SearchBar';
import { CarGrid } from '@/components/guest/CarGrid';
import { cn } from '@/lib/utils/cn';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { parseISO, differenceInDays } from 'date-fns';

// Sample cars data - in a real app this would come from an API
const allCars = [
  {
    id: '1',
    name: 'BMW M3 Competition',
    make: 'BMW',
    model: 'M3 Competition',
    year: 2023,
    price: 15999,
    originalPrice: 18999,
    rating: 4.9,
    trips: 89,
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    mileage: '10 km/l',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
    location: { area: 'Koramangala', city: 'Bangalore' },
    host: { name: 'Rajesh K.', verified: true, superhost: true, rating: 4.9 },
    instantBook: true,
    deliveryAvailable: true,
    category: 'sports',
  },
  {
    id: '2',
    name: 'Mercedes-Benz S-Class',
    make: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2024,
    price: 17999,
    originalPrice: 20999,
    rating: 5.0,
    trips: 124,
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    location: { area: 'Indiranagar', city: 'Bangalore' },
    host: { name: 'Priya S.', verified: true, superhost: false, rating: 4.7 },
    instantBook: true,
    deliveryAvailable: true,
    category: 'luxury',
  },
  {
    id: '3',
    name: 'Porsche Cayenne',
    make: 'Porsche',
    model: 'Cayenne',
    year: 2023,
    price: 14999,
    originalPrice: 17999,
    rating: 4.9,
    trips: 156,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    location: { area: 'HSR Layout', city: 'Bangalore' },
    host: { name: 'Vikram J.', verified: true, superhost: true, rating: 4.9 },
    instantBook: false,
    deliveryAvailable: true,
    category: 'suv',
  },
  {
    id: '4',
    name: 'Tesla Model S',
    make: 'Tesla',
    model: 'Model S',
    year: 2024,
    price: 8999,
    originalPrice: 10999,
    rating: 4.9,
    trips: 312,
    fuel: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    location: { area: 'Whitefield', city: 'Bangalore' },
    host: { name: 'Arjun R.', verified: true, superhost: true, rating: 5.0 },
    instantBook: true,
    deliveryAvailable: true,
    category: 'electric',
  },
  {
    id: '5',
    name: 'Maruti Swift',
    make: 'Maruti',
    model: 'Swift',
    year: 2023,
    price: 1499,
    rating: 4.5,
    trips: 234,
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    location: { area: 'BTM Layout', city: 'Bangalore' },
    host: { name: 'Suresh M.', verified: true, superhost: false, rating: 4.6 },
    instantBook: true,
    deliveryAvailable: false,
    category: 'hatchback',
  },
  {
    id: '6',
    name: 'Honda City',
    make: 'Honda',
    model: 'City',
    year: 2023,
    price: 2499,
    rating: 4.7,
    trips: 189,
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80',
    location: { area: 'Marathahalli', city: 'Bangalore' },
    host: { name: 'Kiran P.', verified: true, superhost: true, rating: 4.8 },
    instantBook: true,
    deliveryAvailable: true,
    category: 'sedan',
  },
];

const FUEL_TYPES = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
const TRANSMISSION_TYPES = ['All', 'Automatic', 'Manual'];
const SEAT_OPTIONS = ['All', '2', '4', '5', '6', '7+'];
const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'trips', label: 'Most Popular' },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';
  const pickup = searchParams.get('pickup') || '';
  const returnDate = searchParams.get('return') || '';
  
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    fuel: 'All',
    transmission: 'All',
    seats: 'All',
    priceMin: '',
    priceMax: '',
    instantBook: false,
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Calculate trip duration
  const tripDays = useMemo(() => {
    if (pickup && returnDate) {
      try {
        const start = parseISO(pickup);
        const end = parseISO(returnDate);
        return Math.max(1, differenceInDays(end, start));
      } catch {
        return 1;
      }
    }
    return 1;
  }, [pickup, returnDate]);

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let result = [...allCars];

    // Filter by location
    if (location) {
      result = result.filter(car => 
        car.location.area.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by fuel type
    if (filters.fuel !== 'All') {
      result = result.filter(car => car.fuel === filters.fuel);
    }

    // Filter by transmission
    if (filters.transmission !== 'All') {
      result = result.filter(car => car.transmission === filters.transmission);
    }

    // Filter by seats
    if (filters.seats !== 'All') {
      if (filters.seats === '7+') {
        result = result.filter(car => car.seats >= 7);
      } else {
        result = result.filter(car => car.seats === parseInt(filters.seats));
      }
    }

    // Filter by price
    if (filters.priceMin) {
      result = result.filter(car => car.price >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter(car => car.price <= parseInt(filters.priceMax));
    }

    // Filter by instant book
    if (filters.instantBook) {
      result = result.filter(car => car.instantBook);
    }

    // Sort
    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'trips':
        result.sort((a, b) => b.trips - a.trips);
        break;
    }

    return result;
  }, [location, filters, sortBy]);

  const handleToggleFavorite = (carId: string) => {
    setFavorites(prev =>
      prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const clearFilters = () => {
    setFilters({
      fuel: 'All',
      transmission: 'All',
      seats: 'All',
      priceMin: '',
      priceMax: '',
      instantBook: false,
    });
  };

  const activeFiltersCount = [
    filters.fuel !== 'All',
    filters.transmission !== 'All',
    filters.seats !== 'All',
    filters.priceMin !== '',
    filters.priceMax !== '',
    filters.instantBook,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <GuestNavbar />

      <main className="pt-20">
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar compact />
          </div>
        </div>

        {/* Results Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {location ? `Cars in ${location}` : 'All Cars in Bangalore'}
              </h1>
              <p className="text-gray-600 dark:text-white/70 mt-1">
                {filteredCars.length} cars available
                {pickup && returnDate && ` for ${tripDays} day${tripDays > 1 ? 's' : ''}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter Button */}
              <Button
                variant={showFilters ? 'primary' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={cn(
                    "appearance-none px-4 py-2.5 pr-10 rounded-xl border",
                    "bg-white dark:bg-gray-900",
                    "border-gray-300 dark:border-white/10",
                    "text-gray-900 dark:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-primary-600",
                    "cursor-pointer"
                  )}
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className={cn(
              "mt-4 p-6 rounded-2xl",
              "bg-white dark:bg-gray-900",
              "border border-gray-200 dark:border-white/10"
            )}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 dark:text-accent-cyan hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Fuel Type
                  </label>
                  <select
                    value={filters.fuel}
                    onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border",
                      "bg-white dark:bg-gray-800",
                      "border-gray-300 dark:border-white/10",
                      "text-gray-900 dark:text-white",
                      "focus:outline-none focus:ring-2 focus:ring-primary-600"
                    )}
                  >
                    {FUEL_TYPES.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Transmission
                  </label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border",
                      "bg-white dark:bg-gray-800",
                      "border-gray-300 dark:border-white/10",
                      "text-gray-900 dark:text-white",
                      "focus:outline-none focus:ring-2 focus:ring-primary-600"
                    )}
                  >
                    {TRANSMISSION_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Seats
                  </label>
                  <select
                    value={filters.seats}
                    onChange={(e) => setFilters({ ...filters, seats: e.target.value })}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border",
                      "bg-white dark:bg-gray-800",
                      "border-gray-300 dark:border-white/10",
                      "text-gray-900 dark:text-white",
                      "focus:outline-none focus:ring-2 focus:ring-primary-600"
                    )}
                  >
                    {SEAT_OPTIONS.map(seats => (
                      <option key={seats} value={seats}>{seats === 'All' ? 'All' : `${seats} seats`}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                    placeholder="Min"
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border",
                      "bg-white dark:bg-gray-800",
                      "border-gray-300 dark:border-white/10",
                      "text-gray-900 dark:text-white",
                      "focus:outline-none focus:ring-2 focus:ring-primary-600"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                    placeholder="Max"
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border",
                      "bg-white dark:bg-gray-800",
                      "border-gray-300 dark:border-white/10",
                      "text-gray-900 dark:text-white",
                      "focus:outline-none focus:ring-2 focus:ring-primary-600"
                    )}
                  />
                </div>

                {/* Instant Book */}
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.instantBook}
                      onChange={(e) => setFilters({ ...filters, instantBook: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-white/70">
                      Instant Book Only
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Car Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <CarGrid
            cars={filteredCars}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            emptyMessage="No cars match your filters. Try adjusting your search criteria."
          />
        </div>
      </main>

      <GuestFooter />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
