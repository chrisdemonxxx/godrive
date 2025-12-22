import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, type ReviewFormData } from '@/schemas';
import { useBooking } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent, Button, Textarea, Skeleton, ErrorState } from '@/components';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SubmitReview(): JSX.Element {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { data: bookingData, isLoading } = useBooking(bookingId || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      booking_id: bookingId || '',
      type: 'guest_to_host',
      rating: 5,
    },
  });

  const rating = watch('rating');

  const onSubmit = async (data: ReviewFormData) => {
    try {
      // TODO: Implement review submission API
      toast.success('Review submitted successfully!');
      navigate(`/bookings/${bookingId}`);
    } catch (error) {
      toast.error('Failed to submit review');
      console.error('Submit review error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!bookingData?.data) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            title="Booking not found"
            message="The booking you are trying to review does not exist."
            onRetry={() => navigate(-1)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Overall Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setValue('rating', star, { shouldValidate: true })}
                      className={`${
                        star <= rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      } hover:scale-110 transition-transform`}
                    >
                      <Star className="w-8 h-8" />
                    </button>
                  ))}
                </div>
                {errors.rating && (
                  <p className="mt-2 text-sm text-red-600">{errors.rating.message}</p>
                )}
              </div>

              {/* Comment */}
              <div>
                <Textarea
                  label="Your Review (Optional)"
                  placeholder="Share your experience..."
                  rows={5}
                  {...register('comment')}
                  error={errors.comment?.message}
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Submit Review
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
