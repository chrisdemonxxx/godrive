import { z } from 'zod';

/**
 * Car form schema
 */
export const carSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z
    .number()
    .int('Year must be a whole number')
    .min(2010, 'Year must be 2010 or later')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  variant: z.string().optional(),
  transmission: z.enum(['manual', 'automatic'], {
    required_error: 'Transmission type is required',
  }),
  fuel_type: z.enum(['petrol', 'diesel', 'cng', 'electric', 'hybrid'], {
    required_error: 'Fuel type is required',
  }),
  seats: z
    .number()
    .int('Seats must be a whole number')
    .min(2, 'Car must have at least 2 seats')
    .max(8, 'Car cannot have more than 8 seats'),
  color: z.string().optional(),
  registration_number: z
    .string()
    .min(1, 'Registration number is required')
    .regex(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/i, 'Please enter a valid registration number (e.g., KA01AB1234)'),
  location_address: z.string().min(1, 'Address is required'),
  location_area: z.string().min(1, 'Area is required'),
  location_city: z.string().default('Bangalore'),
  location_lat: z.number().optional(),
  location_lng: z.number().optional(),
  hourly_rate: z.number().int().min(0).optional(),
  daily_rate: z
    .number()
    .int('Daily rate must be a whole number')
    .min(50000, 'Daily rate must be at least ₹500'),
  weekly_rate: z.number().int().min(0).optional(),
  security_deposit: z
    .number()
    .int('Security deposit must be a whole number')
    .min(300000, 'Security deposit must be at least ₹3,000')
    .default(300000),
  unlimited_km: z.boolean().default(true),
  km_limit_per_day: z.number().int().min(0).optional(),
  extra_km_charge: z.number().int().min(0).optional(),
  features: z.array(z.string()).default([]),
  guidelines: z.string().optional(),
  pickup_instructions: z.string().optional(),
  instant_booking: z.boolean().default(false),
});

export type CarFormData = z.infer<typeof carSchema>;
