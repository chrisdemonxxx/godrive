import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingRequestSchema, type BookingRequestFormData } from '@/schemas';
import { useCar, useCreateBooking, useAuth } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent, Button, DatePicker, Textarea, Skeleton, ErrorState } from '@/components';
import { formatCurrency } from '@/utils';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingRequest(): JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const carId = searchParams.get('car');
  const { user } = useAuth();
  const { data: carData, isLoading: carLoading } = useCar(carId || '');
  const createBookingMutation = useCreateBooking();

  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BookingRequestFormData>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      car_id: carId || '',
    },
  });

  useEffect(() => {
    if (carId) {
      setValue('car_id', carId);
    }
  }, [carId, setValue]);

  const calculatePrice = () => {
    if (!pickupDate || !returnDate || !carData?.data) return null;

    const hours = Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60));
    const days = Math.ceil(hours / 24);
    const car = carData.data;

    const baseAmount = days * car.daily_rate;
    const serviceFee = Math.round(baseAmount * 0.2); // 20% platform fee
    const securityDeposit = car.security_deposit;
    const totalAmount = baseAmount + serviceFee + securityDeposit;
    const hostPayout = baseAmount - serviceFee;

    return {
      hours,
      days,
      baseAmount,
      serviceFee,
      securityDeposit,
      totalAmount,
      hostPayout,
    };
  };

  const priceBreakdown = calculatePrice();

  const onSubmit = async (data: BookingRequestFormData) => {
    if (!pickupDate || !returnDate || !priceBreakdown) {
      toast.error('Please select pickup and return dates');
      return;
    }

    try {
      if (!user?.id) {
        toast.error('Please login to create a booking');
        navigate('/login');
        return;
      }

      const bookingData = {
        car_id: data.car_id,
        guest_id: user.id,
        host_id: carData.data?.host_id || '',
        pickup_datetime: pickupDate.toISOString(),
        return_datetime: returnDate.toISOString(),
        pickup_location: data.pickup_location,
        guest_notes: data.guest_notes,
        status: 'pending',
        payment_status: 'pending',
        duration_hours: priceBreakdown.hours,
        base_amount: priceBreakdown.baseAmount,
        service_fee: priceBreakdown.serviceFee,
        security_deposit: priceBreakdown.securityDeposit,
        total_amount: priceBreakdown.totalAmount,
        host_payout: priceBreakdown.hostPayout,
      };

      const result = await createBookingMutation.mutateAsync(bookingData);
      if (result.error) {
        throw result.error;
      }

      toast.success('Booking request submitted!');
      navigate(`/bookings/${result.data?.id}`);
    } catch (error) {
      toast.error('Failed to create booking request');
      console.error('Create booking error:', error);
    }
  };

  if (carLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!carData?.data) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            title="Car not found"
            message="The car you are trying to book does not exist."
            onRetry={() => navigate('/search')}
          />
        </div>
      </div>
    );
  }

  const car = carData.data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Car Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {car.make} {car.model} {car.year}
                    </h3>
                    <p className="text-sm text-gray-600">{car.location_area}, {car.location_city}</p>
                  </div>

                  {/* Date Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <DatePicker
                        label="Pickup Date & Time"
                        selected={pickupDate}
                        onSelect={(date) => {
                          setPickupDate(date || null);
                          if (date) {
                            setValue('pickup_datetime', date.toISOString(), { shouldValidate: true });
                          }
                        }}
                        minDate={new Date()}
                        error={errors.pickup_datetime?.message}
                      />
                    </div>

                    <div>
                      <DatePicker
                        label="Return Date & Time"
                        selected={returnDate}
                        onSelect={(date) => {
                          setReturnDate(date || null);
                          if (date) {
                            setValue('return_datetime', date.toISOString(), { shouldValidate: true });
                          }
                        }}
                        minDate={pickupDate || new Date()}
                        error={errors.return_datetime?.message}
                      />
                    </div>
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <Textarea
                      label="Pickup Location"
                      placeholder="Enter the exact pickup location or address"
                      rows={3}
                      {...register('pickup_location')}
                      error={errors.pickup_location?.message}
                      helperText="Be specific about where the guest should pick up the car"
                    />
                  </div>

                  {/* Guest Notes */}
                  <div>
                    <Textarea
                      label="Additional Notes (Optional)"
                      placeholder="Any special requests or instructions..."
                      rows={3}
                      {...register('guest_notes')}
                      error={errors.guest_notes?.message}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    loading={createBookingMutation.isPending}
                    disabled={!pickupDate || !returnDate}
                  >
                    Submit Booking Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Price Breakdown Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Price Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                {priceBreakdown ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {priceBreakdown.days} day{priceBreakdown.days > 1 ? 's' : ''} × {formatCurrency(car.daily_rate)}
                      </span>
                      <span className="font-semibold">{formatCurrency(priceBreakdown.baseAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service Fee (20%)</span>
                      <span className="font-semibold">{formatCurrency(priceBreakdown.serviceFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Security Deposit</span>
                      <span className="font-semibold">{formatCurrency(priceBreakdown.securityDeposit)}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-primary-600">
                          {formatCurrency(priceBreakdown.totalAmount)}
                        </span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Security deposit will be refunded after trip completion (minus any damages)
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Select dates to see pricing</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
