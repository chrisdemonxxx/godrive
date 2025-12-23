'use client';

import { CarCard, type CarCardProps } from './CarCard';
import { cn } from '@/lib/utils/cn';

interface CarGridProps {
  cars: CarCardProps['car'][];
  isLoading?: boolean;
  emptyMessage?: string;
  onToggleFavorite?: (carId: string) => void;
  favorites?: string[];
}

export function CarGrid({ 
  cars, 
  isLoading = false, 
  emptyMessage = 'No cars found',
  onToggleFavorite,
  favorites = []
}: CarGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-96 skeleton rounded-xl" />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-white/60 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isFavorite={favorites.includes(car.id)}
          onToggleFavorite={() => onToggleFavorite?.(car.id)}
        />
      ))}
    </div>
  );
}

