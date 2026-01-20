import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Fuel, Users, Gauge, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from './ui/Badge';
import { cn } from '@/shared/utils/cn';
import { formatCurrency } from '@/shared/utils/formatCurrency';

interface CarCardProps {
  car: {
    id: string;
    make: string;
    model: string;
    year: number;
    images?: Array<{ url: string }>;
    daily_rate: number;
    location_area?: string;
    fuel_type: string;
    seats: number;
    transmission: string;
    rating_average?: number;
    total_trips?: number;
  };
  className?: string;
}

export function CarCard({ car, className }: CarCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const images = car.images && car.images.length > 0 ? car.images : [{ url: '/placeholder-car.jpg' }];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link 
      to={`/cars/${car.id}`}
      className={cn(
        "group bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover block",
        className
      )}
    >
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={images[currentImage].url}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Image navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition",
                    i === currentImage ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Like button */}
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
        >
          <Heart className={cn("w-5 h-5", isLiked ? "fill-red-500 text-red-500" : "text-gray-600")} />
        </button>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {(car.total_trips || 0) > 10 && (
            <Badge className="bg-green-500 text-white text-xs">Popular</Badge>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary-600 transition">
              {car.make} {car.model}
            </h3>
            <p className="text-gray-500 text-sm">{car.year}</p>
          </div>
          {(car.rating_average || 0) > 0 && (
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{car.rating_average?.toFixed(1)}</span>
              <span className="text-gray-400 text-xs">({car.total_trips || 0})</span>
            </div>
          )}
        </div>
        
        {/* Location */}
        <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
          <MapPin className="w-4 h-4" />
          {car.location_area || 'Bangalore'}
        </p>
        
        {/* Features */}
        <div className="flex gap-3 mb-4">
          <span className="text-xs text-gray-500 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
            <Fuel className="w-3 h-3" /> {car.fuel_type}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
            <Users className="w-3 h-3" /> {car.seats} Seats
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
            <Gauge className="w-3 h-3" /> {car.transmission}
          </span>
        </div>
        
        {/* Price */}
        <div className="flex justify-between items-center pt-3 border-t">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              {formatCurrency(car.daily_rate)}
            </span>
            <span className="text-gray-500 text-sm">/day</span>
          </div>
          <span className="text-xs text-gray-400">Excl. fuel</span>
        </div>
      </div>
    </Link>
  );
}
