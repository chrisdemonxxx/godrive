import { z } from 'zod';

/**
 * Booking request schema
 */
export const bookingRequestSchema = z.object({
  car_id: z.string().uuid('Invalid car ID'),
  pickup_datetime: z.string().datetime('Invalid pickup date/time'),
  return_datetime: z.string().datetime('Invalid return date/time'),
  pickup_location: z.string().min(1, 'Pickup location is required'),
  guest_notes: z.string().optional(),
}).refine(
  (data) => new Date(data.return_datetime) > new Date(data.pickup_datetime),
  {
    message: 'Return date must be after pickup date',
    path: ['return_datetime'],
  }
);

export type BookingRequestFormData = z.infer<typeof bookingRequestSchema>;
