import { z } from 'zod';

/**
 * Review submission schema
 */
export const reviewSchema = z.object({
  booking_id: z.string().uuid('Invalid booking ID'),
  type: z.enum(['guest_to_host', 'host_to_guest'], {
    required_error: 'Review type is required',
  }),
  rating: z
    .number()
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  comment: z.string().optional(),
  cleanliness_rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional(),
  communication_rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional(),
  accuracy_rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional(),
  value_rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
