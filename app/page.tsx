'use client';

import { useState } from 'react';
import { GuestNavbar } from '@/components/layout/GuestNavbar';
import { GuestFooter } from '@/components/layout/GuestFooter';
import AuroraBackground from '@/components/layout/AuroraBackground';
import { HeroSection } from '@/components/guest/HeroSection';
import { StatsBar } from '@/components/guest/StatsBar';
import { CategoryTabs } from '@/components/guest/CategoryTabs';
import { CarGrid } from '@/components/guest/CarGrid';
import { WhyGoDrive } from '@/components/guest/WhyGoDrive';
import { Testimonials } from '@/components/guest/Testimonials';
import { HostCTA } from '@/components/guest/HostCTA';
import { cn } from '@/lib/utils/cn';

// Sample car data - replace with real data from API
const sampleCars = [
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
    location: {
      area: 'Koramangala',
      city: 'Bangalore',
    },
    host: {
      name: 'Rajesh K.',
      verified: true,
      superhost: true,
      rating: 4.9,
    },
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
    location: {
      area: 'Indiranagar',
      city: 'Bangalore',
    },
    host: {
      name: 'Priya S.',
      verified: true,
      superhost: false,
      rating: 4.7,
    },
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
    location: {
      area: 'HSR Layout',
      city: 'Bangalore',
    },
    host: {
      name: 'Vikram J.',
      verified: true,
      superhost: true,
      rating: 4.9,
    },
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
    location: {
      area: 'Whitefield',
      city: 'Bangalore',
    },
    host: {
      name: 'Arjun R.',
      verified: true,
      superhost: true,
      rating: 5.0,
    },
    instantBook: true,
    deliveryAvailable: true,
    category: 'electric',
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredCars = activeCategory === 'all'
    ? sampleCars
    : sampleCars.filter(car => car.category === activeCategory);

  const handleToggleFavorite = (carId: string) => {
    setFavorites(prev =>
      prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Aurora Background (only in dark theme) */}
      <AuroraBackground />

      {/* Navigation */}
      <GuestNavbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Bar */}
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <StatsBar />
          </div>
        </section>

        {/* Category Tabs & Featured Cars */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h2 className={cn(
                "text-3xl md:text-4xl font-bold mb-4",
                "text-gray-900 dark:text-white text-center md:text-left"
              )}>
                Featured Cars
              </h2>
              <p className="text-gray-600 dark:text-white/70 text-center md:text-left">
                Handpicked premium vehicles for your next adventure
              </p>
            </div>

            {/* Category Tabs */}
            <div className="mb-8">
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Car Grid */}
            <CarGrid
              cars={filteredCars}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </section>

        {/* Why GoDrive Section */}
        <WhyGoDrive />

        {/* Testimonials */}
        <Testimonials />

        {/* Host CTA */}
        <HostCTA />
      </main>

      {/* Footer */}
      <GuestFooter />
    </div>
  );
}
