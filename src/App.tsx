import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingSpinner } from '@/components';
import Landing from './pages/Landing';
import Login from './modules/auth/pages/Login';
import VerifyOtp from './modules/auth/pages/VerifyOtp';
import AddCar from './modules/cars/pages/AddCar';
import CarDetail from './modules/cars/pages/CarDetail';
import MyCars from './modules/cars/pages/MyCars';
import Search from './modules/cars/pages/Search';
import SearchResults from './modules/cars/pages/SearchResults';
import ManageAvailability from './modules/cars/pages/ManageAvailability';
import BookingRequest from './modules/bookings/pages/BookingRequest';
import BookingDetail from './modules/bookings/pages/BookingDetail';
import GuestDashboard from './modules/users/pages/GuestDashboard';
import HostDashboard from './modules/users/pages/HostDashboard';
import Checkout from './modules/payments/pages/Checkout';
import BookingConfirmation from './modules/bookings/pages/BookingConfirmation';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import PendingPayments from './pages/admin/PendingPayments';
import HostDashboard from './pages/host/Dashboard';
import SubmitReview from './modules/reviews/pages/SubmitReview';
import NotFound from './pages/NotFound';
import { AdminRoute, ProtectedRoute } from './shared/components';
import { AdminLayout } from './modules/admin/layouts/AdminLayout';
import { HostLayout } from './modules/host/layouts/HostLayout';

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading GoDrive...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route
        path="/cars/add"
        element={
          isAuthenticated ? <AddCar /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/search" element={<Search />} />
      <Route path="/search/results" element={<SearchResults />} />
      <Route path="/cars/:id" element={<CarDetail />} />
      <Route
        path="/cars/:id/availability"
        element={
          isAuthenticated ? <ManageAvailability /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/bookings/new"
        element={
          isAuthenticated ? <BookingRequest /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/bookings/:id"
        element={
          isAuthenticated ? <BookingDetail /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/checkout/:bookingId"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings/:id/confirmation"
        element={
          <ProtectedRoute>
            <BookingConfirmation />
          </ProtectedRoute>
        }
      />
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="payments" element={<PendingPayments />} />
      </Route>
      
      {/* Host Routes */}
      <Route
        path="/host"
        element={
          <ProtectedRoute>
            <HostLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HostDashboard />} />
      </Route>
      <Route
        path="/bookings/:bookingId/review"
        element={
          <ProtectedRoute>
            <SubmitReview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/my-cars"
        element={
          <ProtectedRoute>
            <MyCars />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <GuestDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/host"
        element={
          <ProtectedRoute>
            <HostDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </ErrorBoundary>
  );
}

export default App;
