import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCars } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Skeleton, EmptyState, ErrorState } from '@/components';
import { Map } from '@/components/maps';
import { formatCurrency } from '@/utils';
import { MapPin, Settings, Fuel, Users, Star } from 'lucide-react';
import type { CarSearchResult } from '@/types';

function CarCard({ car }: { car: CarSearchResult }): JSX.Element {
  const navigate = useNavigate();

  return (
    <Card
      clickable
      onClick={() => navigate(`/cars/${car.id}`)}
      className="hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Car Image</p>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">
          {car.make} {car.model} {car.year}
        </CardTitle>
        {car.variant && <p className="text-sm text-gray-600 mt-1">{car.variant}</p>}
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{car.location_area}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Settings className="w-4 h-4" />
              {car.transmission}
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              {car.fuel_type}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {car.seats}
            </span>
          </div>
          {car.average_rating > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{car.average_rating.toFixed(1)}</span>
              <span className="text-gray-500">({car.total_reviews || 0} reviews)</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-2xl font-bold text-primary-600">{formatCurrency(car.daily_rate)}</p>
            <p className="text-xs text-gray-500">per day</p>
          </div>
          <Button variant="primary" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SearchResults(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location') || '';
  const pickupDate = searchParams.get('pickup_date') || '';
  const returnDate = searchParams.get('return_date') || '';

  const searchParams_obj = {
    location,
    pickup_date: pickupDate,
    return_date: returnDate,
  };

  const { data, isLoading, error } = useCars(searchParams_obj);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            title="Search failed"
            message={error.error?.message || 'An error occurred while searching for cars.'}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  const cars = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {cars.length} {cars.length === 1 ? 'car' : 'cars'} found
          </h1>
          {location && (
            <p className="text-gray-600">
              in <span className="font-semibold">{location}</span>
            </p>
          )}
        </div>

        {cars.length === 0 ? (
          <EmptyState
            title="No cars found"
            description="Try adjusting your search criteria or check back later for new listings."
            action={{
              label: 'Search Again',
              onClick: () => navigate('/search'),
            }}
          />
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Car List */}
            <div className="space-y-4">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            
            {/* Map View */}
            <div className="hidden lg:block sticky top-20 h-[calc(100vh-120px)]">
              <Map
                center={{ lat: 12.9716, lng: 77.5946 }}
                zoom={11}
                markers={cars
                  .filter(car => car.location_lat && car.location_lng)
                  .map(car => ({
                    id: car.id,
                    position: { lat: car.location_lat!, lng: car.location_lng! },
                    title: `${car.make} ${car.model} - ₹${(car.daily_rate / 100).toLocaleString('en-IN')}/day`,
                    onClick: () => navigate(`/cars/${car.id}`),
                  }))}
                className="h-full rounded-xl border border-gray-200"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
