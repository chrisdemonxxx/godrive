import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCar } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Skeleton, ErrorState, LoadingSpinner } from '@/components';
import { formatCurrency, formatDate } from '@/utils';
import { MapPin, Users, Fuel, Settings, Calendar } from 'lucide-react';

export default function CarDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCar(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            title="Car not found"
            message={error?.error?.message || 'The car you are looking for does not exist or has been removed.'}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  const car = data.data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          ← Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery Placeholder */}
            <Card>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Car Images (Coming Soon)</p>
              </div>
            </Card>

            {/* Car Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {car.make} {car.model} {car.year}
                    </CardTitle>
                    {car.variant && <p className="text-gray-600 mt-1">{car.variant}</p>}
                  </div>
                  <Badge variant={car.status === 'active' ? 'success' : 'default'}>
                    {car.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm capitalize">{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Fuel className="w-5 h-5" />
                    <span className="text-sm capitalize">{car.fuel_type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">{car.location_area}</span>
                  </div>
                </div>

                {car.guidelines && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Guidelines</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{car.guidelines}</p>
                  </div>
                )}

                {car.pickup_instructions && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Pickup Instructions</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{car.pickup_instructions}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature) => (
                      <Badge key={feature} variant="info">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews Section - Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">No reviews yet. Be the first to review!</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Booking Widget */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl">{formatCurrency(car.daily_rate)}/day</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Daily Rate</span>
                    <span className="font-semibold">{formatCurrency(car.daily_rate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Security Deposit</span>
                    <span className="font-semibold">{formatCurrency(car.security_deposit)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button variant="primary" className="w-full" onClick={() => navigate(`/bookings/new?car=${car.id}`)}>
                    Book Now
                  </Button>
                </div>

                {car.instant_booking && (
                  <p className="text-xs text-center text-gray-500">
                    ✓ Instant booking available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
