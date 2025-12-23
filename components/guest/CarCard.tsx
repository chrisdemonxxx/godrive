'use client';

import Link from 'next/link';
import { Heart, MapPin, Fuel, Settings, Users, Star, Zap, Truck, Crown, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

export interface CarCardProps {
  car: {
    id: string;
    name: string;
    make: string;
    model: string;
    year: number;
    price: number;
    originalPrice?: number;
    rating: number;
    trips: number;
    fuel: string;
    transmission: string;
    seats: number;
    mileage?: string;
    image: string;
    location: {
      area: string;
      city: string;
    };
    host: {
      name: string;
      verified: boolean;
      superhost?: boolean;
      rating: number;
    };
    instantBook: boolean;
    deliveryAvailable?: boolean;
    category?: string;
  };
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  showHost?: boolean;
}

export function CarCard({ car, isFavorite = false, onToggleFavorite, showHost = true }: CarCardProps) {
  const discount = car.originalPrice ? Math.round((1 - car.price / car.originalPrice) * 100) : 0;

  return (
    <Link href={`/cars/${car.id}`}>
      <Card
        variant="default"
        hover
        className={cn(
          "group overflow-hidden cursor-pointer",
          "border-gray-100 dark:border-white/10"
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-gray-100 dark:bg-white/5">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {discount > 0 && (
              <Badge variant="error" size="sm" className="font-bold">
                {discount}% OFF
              </Badge>
            )}
            {car.instantBook && (
              <Badge variant="info" size="sm" className="flex items-center gap-1 bg-gradient-primary text-white border-0">
                <Zap className="w-3 h-3" />
                Instant
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className={cn(
              "absolute top-3 right-3 w-10 h-10 rounded-xl",
              "bg-black/50 backdrop-blur-md",
              "flex items-center justify-center",
              "transition-all hover:scale-110",
              "border border-white/20"
            )}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-white"
              )}
            />
          </button>

          {/* Price Tag */}
          <div className={cn(
            "absolute bottom-3 right-3 px-4 py-2 rounded-xl",
            "bg-black/70 backdrop-blur-md border border-white/20"
          )}>
            <span className={cn(
              "text-2xl font-bold",
              "bg-gradient-primary bg-clip-text text-transparent"
            )}>
              ₹{car.price.toLocaleString()}
            </span>
            <span className="text-xs text-white/60 ml-1">/day</span>
          </div>

          {/* Delivery Badge */}
          {car.deliveryAvailable && (
            <div className={cn(
              "absolute bottom-3 left-3 px-3 py-1.5 rounded-lg",
              "bg-green-500/20 backdrop-blur-md border border-green-500/40",
              "flex items-center gap-1.5"
            )}>
              <Truck className="w-3 h-3 text-green-400" />
              <span className="text-xs font-semibold text-green-400">Delivery</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title and Location */}
          <div className="mb-3">
            <h3 className={cn(
              "text-lg font-semibold mb-1",
              "text-gray-900 dark:text-white",
              "group-hover:text-primary-600 dark:group-hover:text-accent-cyan transition-colors"
            )}>
              {car.name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-white/60">
              <MapPin className="w-3.5 h-3.5" />
              <span>{car.location.area}</span>
            </div>
          </div>

          {/* Specs */}
          <div className="flex gap-4 pb-4 mb-4 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-white/70">
              <Fuel className="w-4 h-4" />
              <span>{car.fuel}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-white/70">
              <Settings className="w-4 h-4" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-white/70">
              <Users className="w-4 h-4" />
              <span>{car.seats}</span>
            </div>
          </div>

          {/* Host & Rating */}
          {showHost && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "w-9 h-9 rounded-xl",
                  "bg-gradient-primary",
                  "flex items-center justify-center",
                  "font-semibold text-sm text-white"
                )}>
                  {car.host.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white">
                    {car.host.name.split(' ')[0]}
                    {car.host.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    )}
                    {car.host.superhost && (
                      <Crown className="w-3.5 h-3.5 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-white/60">
                    {car.trips} trips
                  </div>
                </div>
              </div>

              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                "bg-yellow-500/10 border border-yellow-500/20"
              )}>
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-500">{car.rating}</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

