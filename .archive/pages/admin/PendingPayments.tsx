import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Container } from '@/components';
import { Button } from '@/components';
import { Badge } from '@/components';
import { supabase } from '@/shared/lib/supabase';
import { formatCurrency } from '@/utils/formatCurrency';
import { Check, X, RefreshCw, Clock, User, Car, Phone } from 'lucide-react';
import { toast } from 'sonner';

async function getPendingPayments() {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      car:cars(make, model, year, registration_number),
      guest:users!bookings_guest_id_fkey(full_name, phone, email),
      host:users!bookings_host_id_fkey(full_name, phone)
    `)
    .in('payment_status', ['pending'])
    .not('upi_transaction_id', 'is', null)
    .order('payment_submitted_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
}

async function verifyPayment(bookingId: string, verified: boolean) {
  const { error } = await supabase
    .from('bookings')
    .update({ 
      status: verified ? 'confirmed' : 'cancelled',
      payment_status: verified ? 'deposit_paid' : 'failed',
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);
    
  if (error) throw error;
}

export default function PendingPayments() {
  const queryClient = useQueryClient();
  
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['pending-payments'],
    queryFn: getPendingPayments,
    refetchInterval: 30000,
  });
  
  const verifyMutation = useMutation({
    mutationFn: ({ id, verified }: { id: string; verified: boolean }) => 
      verifyPayment(id, verified),
    onSuccess: (_, { verified }) => {
      toast.success(verified ? 'Payment verified & booking confirmed!' : 'Payment rejected');
      queryClient.invalidateQueries({ queryKey: ['pending-payments'] });
    },
    onError: () => {
      toast.error('Action failed. Please try again.');
    }
  });

  const pendingCount = bookings?.length || 0;

  return (
    <Container className="py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Verification</h1>
          <p className="text-gray-500">Review and verify pending UPI payments</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={pendingCount > 0 ? 'warning' : 'default'} className="text-sm px-3 py-1">
            {pendingCount} pending
          </Badge>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : pendingCount === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No pending payments to verify</p>
          <p className="text-gray-400 text-sm mt-1">New payments will appear here automatically</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings?.map((booking: any) => (
            <div key={booking.id} className="bg-white border rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-b">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-primary-600">{booking.booking_number}</span>
                  <Badge variant="warning">Payment Pending</Badge>
                </div>
                <span className="text-sm text-gray-500">
                  {booking.payment_submitted_at && new Date(booking.payment_submitted_at).toLocaleString('en-IN')}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  {/* Amount */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(booking.total_amount)}
                    </p>
                  </div>
                  
                  {/* Guest */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Guest</p>
                    <p className="font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {booking.guest?.full_name}
                    </p>
                    <a href={`tel:${booking.guest?.phone}`} className="text-sm text-primary-600 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {booking.guest?.phone}
                    </a>
                  </div>
                  
                  {/* Car */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Car</p>
                    <p className="font-medium flex items-center gap-2">
                      <Car className="w-4 h-4 text-gray-400" />
                      {booking.car?.make} {booking.car?.model}
                    </p>
                    <p className="text-sm text-gray-500">{booking.car?.registration_number}</p>
                  </div>
                  
                  {/* Transaction ID */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">UPI Transaction ID</p>
                    <p className="font-mono font-bold text-lg text-blue-600 bg-blue-50 px-3 py-1 rounded inline-block">
                      {booking.upi_transaction_id}
                    </p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => verifyMutation.mutate({ id: booking.id, verified: true })}
                    disabled={verifyMutation.isPending}
                    className="flex-1"
                    size="lg"
                    variant="primary"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Verify & Confirm Booking
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (confirm('Reject this payment? The booking will be cancelled.')) {
                        verifyMutation.mutate({ id: booking.id, verified: false });
                      }
                    }}
                    disabled={verifyMutation.isPending}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
