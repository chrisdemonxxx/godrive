import { ApiClient } from './base';
import type { Booking } from '@/types';
import type { ApiResponse } from '@/types';

/**
 * Get all bookings for current user
 */
export async function getBookings(filters?: {
  status?: string;
  guest_id?: string;
  host_id?: string;
}): Promise<ApiResponse<Booking[]>> {
  return ApiClient.getMany<Booking>('bookings', {
    filters: filters || {},
    orderBy: { column: 'created_at', ascending: false },
  });
}

/**
 * Get single booking by ID
 */
export async function getBooking(id: string): Promise<ApiResponse<Booking>> {
  return ApiClient.getOne<Booking>('bookings', id);
}

/**
 * Create booking request
 */
export async function createBooking(data: Partial<Booking>): Promise<ApiResponse<Booking>> {
  return ApiClient.create<Booking>('bookings', data);
}

/**
 * Update booking
 */
export async function updateBooking(
  id: string,
  data: Partial<Booking>
): Promise<ApiResponse<Booking>> {
  return ApiClient.update<Booking>('bookings', id, data);
}

/**
 * Cancel booking
 */
export async function cancelBooking(
  id: string,
  reason: string,
  cancelledBy: 'guest' | 'host' | 'admin'
): Promise<ApiResponse<Booking>> {
  return ApiClient.update<Booking>('bookings', id, {
    status: 'cancelled',
    cancellation_reason: reason,
    cancelled_by: cancelledBy,
    cancelled_at: new Date().toISOString(),
  } as Partial<Booking>);
}
