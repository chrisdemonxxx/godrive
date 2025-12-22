import { z } from 'zod';

/**
 * Phone number validation schema
 */
export const phoneSchema = z
  .string()
  .min(10, 'Phone number must be 10 digits')
  .max(10, 'Phone number must be 10 digits')
  .regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number');

/**
 * Login form schema
 */
export const loginSchema = z.object({
  phone: phoneSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * OTP verification schema
 */
export const otpSchema = z.object({
  phone: z.string(),
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only digits'),
});

export type OtpFormData = z.infer<typeof otpSchema>;
