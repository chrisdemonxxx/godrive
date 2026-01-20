import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { useBookings } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, EmptyState, Skeleton } from '@/components';
import { formatCurrency, formatDateTime } from '@/utils';
import { Calendar, Car, Plus } from 'lucide-react';

export default function GuestDashboard(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading } = useBookings(user ? { guest_id: user.id } : undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  const bookings = data?.data || [];
  const upcomingBookings = bookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );
  const pastBookings = bookings.filter((b) => b.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">Manage your car rentals</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/search')} icon={Plus}>
            Book a Car
          </Button>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Trips</h2>
          {upcomingBookings.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No upcoming bookings"
              description="Start exploring cars available in Bangalore"
              action={{
                label: 'Search Cars',
                onClick: () => navigate('/search'),
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} clickable onClick={() => navigate(`/bookings/${booking.id}`)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.booking_number}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatDateTime(booking.pickup_datetime)}
                        </p>
                      </div>
                      <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {booking.car && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-900">
                          {booking.car.make} {booking.car.model}
                        </p>
                        <p className="text-xs text-gray-600">{booking.car.location_area}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-lg font-bold text-primary-600">
                          {formatCurrency(booking.total_amount)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Past Trips */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Trips</h2>
          {pastBookings.length === 0 ? (
            <EmptyState
              icon={Car}
              title="No past trips"
              description="Your completed trips will appear here"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastBookings.map((booking) => (
                <Card key={booking.id} clickable onClick={() => navigate(`/bookings/${booking.id}`)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.booking_number}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatDateTime(booking.pickup_datetime)}
                        </p>
                      </div>
                      <Badge variant="success">Completed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {booking.car && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-900">
                          {booking.car.make} {booking.car.model}
                        </p>
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
