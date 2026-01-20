import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Skeleton, ErrorState } from '@/components';
import { formatCurrency, formatDateTime } from '@/utils';
import { Calendar, MapPin, User, Car } from 'lucide-react';
import { toast } from 'sonner';

export default function BookingDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useBooking(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            title="Booking not found"
            message={error?.error?.message || 'The booking you are looking for does not exist.'}
            onRetry={() => navigate(-1)}
          />
        </div>
      </div>
    );
  }

  const booking = data.data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'active':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">Booking {booking.booking_number}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Created on {formatDateTime(booking.created_at)}</p>
              </div>
              <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Car Info */}
            {booking.car && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  {booking.car.make} {booking.car.model} {booking.car.year}
                </h3>
                <p className="text-sm text-gray-600">{booking.car.location_area}</p>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Pickup
                </h4>
                <p className="text-gray-900">{formatDateTime(booking.pickup_datetime)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Return
                </h4>
                <p className="text-gray-900">{formatDateTime(booking.return_datetime)}</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Pickup Location
              </h4>
              <p className="text-gray-900">{booking.pickup_location}</p>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Price Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Amount</span>
                  <span className="font-semibold">{formatCurrency(booking.base_amount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-semibold">{formatCurrency(booking.service_fee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Security Deposit</span>
                  <span className="font-semibold">{formatCurrency(booking.security_deposit)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-primary-600">
                    {formatCurrency(booking.total_amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Status</h4>
              <Badge variant={booking.payment_status === 'fully_paid' ? 'success' : 'warning'}>
                {booking.payment_status}
              </Badge>
            </div>

            {/* Actions */}
            {booking.status === 'pending' && booking.payment_status === 'pending' && (
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <Button
                  variant="primary"
                  onClick={() => navigate(`/checkout/${booking.id}`)}
                >
                  Proceed to Payment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // TODO: Implement cancellation
                    toast.error('Cancellation not yet implemented');
                  }}
                >
                  Cancel Booking
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
