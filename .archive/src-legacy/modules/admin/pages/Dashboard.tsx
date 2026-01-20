import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components';
import { Users, Car, Calendar, DollarSign } from 'lucide-react';

export default function AdminDashboard(): JSX.Element {
  // TODO: Fetch real metrics from API
  const metrics = {
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
    totalRevenue: 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage GoDrive platform</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Cars</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.totalCars}</p>
                </div>
                <Car className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">₹{metrics.totalRevenue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card clickable onClick={() => window.location.href = '/admin/users'}>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">View and manage all users</p>
            </CardContent>
          </Card>

          <Card clickable onClick={() => window.location.href = '/admin/cars/approvals'}>
            <CardHeader>
              <CardTitle>Car Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Review and approve car listings</p>
            </CardContent>
          </Card>

          <Card clickable onClick={() => window.location.href = '/admin/bookings'}>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">View and manage all bookings</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
