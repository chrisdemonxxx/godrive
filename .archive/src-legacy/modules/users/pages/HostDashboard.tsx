import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { useBookings, useCars } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, EmptyState, Skeleton } from '@/components';
import { formatCurrency, formatDateTime } from '@/utils';
import { Calendar, Car, DollarSign, TrendingUp, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HostDashboard(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'requests' | 'bookings' | 'earnings'>('requests');

  const { data: bookingsData, isLoading: bookingsLoading } = useBookings(
    user ? { host_id: user.id } : undefined
  );
  const { data: carsData, isLoading: carsLoading } = useCars(user ? { host_id: user.id } : undefined);

  if (bookingsLoading || carsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  const bookings = bookingsData?.data || [];
  const cars = carsData?.data || [];
  const pendingRequests = bookings.filter((b) => b.status === 'pending');
  const activeBookings = bookings.filter((b) => b.status === 'confirmed' || b.status === 'active');

  // Calculate earnings (simplified)
  const totalEarnings = bookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + (b.host_payout || 0), 0);

  const pendingEarnings = bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'active')
    .reduce((sum, b) => sum + (b.host_payout || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Host Dashboard</h1>
            <p className="text-gray-600">Manage your cars and bookings</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/cars/add')} icon={Plus}>
            Add New Car
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(totalEarnings)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{pendingRequests.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{activeBookings.length}</p>
                </div>
                <Car className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Listed Cars</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{cars.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requests'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending Requests ({pendingRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Active Bookings ({activeBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'earnings'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Earnings
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'requests' && (
          <div>
            {pendingRequests.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No pending requests"
                description="New booking requests will appear here"
              />
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{booking.booking_number}</h3>
                            <Badge variant="warning">Pending</Badge>
                          </div>
                          {booking.car && (
                            <p className="text-sm text-gray-600 mb-2">
                              {booking.car.make} {booking.car.model}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            {formatDateTime(booking.pickup_datetime)} - {formatDateTime(booking.return_datetime)}
                          </p>
                          <p className="text-lg font-bold text-primary-600 mt-2">
                            {formatCurrency(booking.total_amount)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement accept booking
                              toast.success('Accept booking - Coming soon');
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement decline booking
                              toast.error('Decline booking - Coming soon');
                            }}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            {activeBookings.length === 0 ? (
              <EmptyState
                icon={Car}
                title="No active bookings"
                description="Confirmed and active bookings will appear here"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeBookings.map((booking) => (
                  <Card key={booking.id} clickable onClick={() => navigate(`/bookings/${booking.id}`)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{booking.booking_number}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatDateTime(booking.pickup_datetime)}
                          </p>
                        </div>
                        <Badge variant="success">{booking.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {booking.car && (
                        <p className="text-sm font-medium text-gray-900 mb-4">
                          {booking.car.make} {booking.car.model}
                        </p>
                      )}
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="text-lg font-bold text-primary-600">
                            {formatCurrency(booking.total_amount)}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Earnings</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(totalEarnings)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Payout</span>
                    <span className="text-xl font-semibold text-gray-900">
                      {formatCurrency(pendingEarnings)}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Payouts are processed weekly on Wednesdays. Completed trips are eligible for payout after a 7-day dispute window.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
