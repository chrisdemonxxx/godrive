import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Container } from '@/components';
import { UPIPayment } from '@/components/UPIPayment';
import { LoadingSpinner, ErrorState, Button } from '@/components';
import { supabase } from '@/shared/lib/supabase';
import { formatCurrency } from '@/utils/formatCurrency';
import { Car, Calendar, MapPin, Clock, Shield, ArrowLeft, User, Phone } from 'lucide-react';
import { toast } from 'sonner';

async function getBookingForCheckout(bookingId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      car:cars(id, make, model, year, transmission, fuel_type, registration_number, location_address),
      host:users!bookings_host_id_fkey(id, full_name, phone, avatar_url)
    `)
    .eq('id', bookingId)
    .single();
    
  if (error) throw error;
  return data;
}

async function submitPayment(bookingId: string, transactionId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'pending',
      payment_status: 'pending',
      upi_transaction_id: transactionId,
      payment_submitted_at: new Date().toISOString(),
    })
    .eq('id', bookingId);
    
  if (error) throw error;
  
  // Create notification for admin
  await supabase.from('notifications').insert({
    user_id: user.id,
    title: 'Payment Submitted',
    body: `Payment submitted for verification. Transaction ID: ${transactionId}`,
    type: 'payment_submitted',
    data: { booking_id: bookingId, transaction_id: transactionId }
  });
}

export default function Checkout() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  
  const { data: booking, isLoading, error } = useQuery({
    queryKey: ['booking-checkout', bookingId],
    queryFn: () => getBookingForCheckout(bookingId!),
    enabled: !!bookingId,
  });
  
  const paymentMutation = useMutation({
    mutationFn: (transactionId: string) => submitPayment(bookingId!, transactionId),
    onSuccess: () => {
      toast.success('Payment submitted! We will verify and confirm within 30 minutes.');
      navigate(`/bookings/${bookingId}/confirmation?status=pending`);
    },
    onError: (error) => {
      console.error('Payment submission error:', error);
      toast.error('Failed to submit payment. Please try again.');
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container className="max-w-5xl">
          <LoadingSpinner size="lg" />
        </Container>
      </div>
    );
  }
  
  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container className="max-w-5xl">
          <ErrorState 
            title="Booking not found"
            message="The booking you are trying to pay for does not exist."
            onRetry={() => navigate(-1)}
          />
        </Container>
      </div>
    );
  }

  const totalAmountInRupees = booking.total_amount / 100;
  const baseAmountInRupees = booking.base_amount / 100;
  const serviceFeeInRupees = booking.service_fee / 100;
  const depositInRupees = booking.security_deposit / 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 md:py-10 max-w-5xl">
        {/* Back Button */}
        <Link 
          to={`/bookings/${bookingId}`} 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Booking
        </Link>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Complete Payment</h1>
        
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Booking Summary - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Details */}
            <div className="bg-white rounded-2xl border p-6">
              <h2 className="font-semibold text-lg mb-4">Booking Summary</h2>
              
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Car className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{booking.car?.make} {booking.car?.model}</p>
                  <p className="text-gray-500">{booking.car?.year} • {booking.car?.transmission} • {booking.car?.fuel_type}</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm border-t pt-4">
                <div className="flex items-start gap-3 text-gray-600">
                  <Calendar className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(booking.pickup_datetime).toLocaleDateString('en-IN', { 
                        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                    <p>
                      {new Date(booking.pickup_datetime).toLocaleTimeString('en-IN', { 
                        hour: '2-digit', minute: '2-digit'
                      })} - {new Date(booking.return_datetime).toLocaleTimeString('en-IN', { 
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-gray-600">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>{booking.duration_hours} hours</p>
                </div>
                
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>{booking.pickup_location || booking.car?.location_address}</p>
                </div>
              </div>
            </div>
            
            {/* Host Info */}
            {booking.host && (
              <div className="bg-white rounded-2xl border p-6">
                <h3 className="font-semibold mb-3">Your Host</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium">{booking.host.full_name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      Contact after confirmation
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Price Breakdown */}
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="font-semibold mb-4">Price Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Trip fare ({booking.duration_hours} hrs)</span>
                  <span>₹{baseAmountInRupees.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service fee</span>
                  <span>₹{serviceFeeInRupees.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Security deposit
                    <span className="text-xs text-green-600">(Refundable)</span>
                  </span>
                  <span>₹{depositInRupees.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span className="text-primary-600">₹{totalAmountInRupees.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Section - Right Side */}
          <div className="lg:col-span-3">
            <UPIPayment
              amount={totalAmountInRupees}
              bookingNumber={booking.booking_number}
              onPaymentSubmit={(txnId) => paymentMutation.mutate(txnId)}
              isSubmitting={paymentMutation.isPending}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
