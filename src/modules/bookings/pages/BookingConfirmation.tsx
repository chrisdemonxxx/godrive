import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@/components';
import { Button } from '@/components';
import { supabase } from '@/shared/lib/supabase';
import { CheckCircle, Clock, Home, FileText, Phone, MessageCircle } from 'lucide-react';

export default function BookingConfirmation() {
  const { id: bookingId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  
  const { data: booking } = useQuery({
    queryKey: ['booking-confirmation', bookingId],
    queryFn: async () => {
      const { data } = await supabase
        .from('bookings')
        .select('*, car:cars(make, model)')
        .eq('id', bookingId)
        .single();
      return data;
    },
    enabled: !!bookingId,
  });

  const isPending = status === 'pending';
  const supportPhone = import.meta.env.VITE_SUPPORT_PHONE || '+919876543210';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Container className="max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
            isPending ? 'bg-yellow-100' : 'bg-green-100'
          }`}>
            {isPending ? (
              <Clock className="w-10 h-10 text-yellow-600" />
            ) : (
              <CheckCircle className="w-10 h-10 text-green-600" />
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isPending ? 'Payment Submitted!' : 'Booking Confirmed!'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {isPending 
              ? 'We\'re verifying your payment. You\'ll receive confirmation within 30 minutes.'
              : 'Your booking is confirmed! Get ready for your trip.'
            }
          </p>
          
          {/* Booking Reference */}
          {booking && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
              <p className="text-2xl font-mono font-bold text-primary-600">
                {booking.booking_number}
              </p>
              {booking.car && (
                <p className="text-sm text-gray-600 mt-2">
                  {booking.car.make} {booking.car.model}
                </p>
              )}
            </div>
          )}
          
          {/* What's Next */}
          {isPending && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
              <p className="font-medium text-blue-900 mb-2">What happens next?</p>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  We verify your UPI payment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  Host confirms availability
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  You receive confirmation SMS & email
                </li>
              </ul>
            </div>
          )}
          
          {/* Support Info */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <a href={`tel:${supportPhone}`} className="flex items-center gap-1 hover:text-primary-600">
              <Phone className="w-4 h-4" />
              Support
            </a>
            <span>•</span>
            <a href={`https://wa.me/${supportPhone.replace('+', '').replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-primary-600">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
          
          {/* Actions */}
          <div className="space-y-3">
            <Link to={`/bookings/${bookingId}`} className="block">
              <Button variant="primary" className="w-full" size="lg">
                <FileText className="w-4 h-4 mr-2" />
                View Booking Details
              </Button>
            </Link>
            <Link to="/" className="block">
              <Button variant="outline" className="w-full" size="lg">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
