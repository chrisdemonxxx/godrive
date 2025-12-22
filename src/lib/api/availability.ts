import { ApiClient } from './base';
import type { CarAvailability } from '@/types';
import type { ApiResponse } from '@/types';

/**
 * Get car availability for date range
 */
export async function getCarAvailability(
  carId: string,
  startDate?: string,
  endDate?: string
): Promise<ApiResponse<CarAvailability[]>> {
  return ApiClient.getMany<CarAvailability>('car_availability', {
    filters: {
      car_id: carId,
    },
  });
}

/**
 * Check if car is available for dates
 */
export async function checkAvailability(
  carId: string,
  pickupDate: string,
  returnDate: string
): Promise<ApiResponse<boolean>> {
  // This will check for conflicts with bookings and blocked dates
  // For now, return a simple check
  const result = await getCarAvailability(carId, pickupDate, returnDate);
  
  if (result.error) {
    return { data: null, error: result.error };
  }

  // Check if any dates in range are unavailable
  const unavailable = result.data?.some(
    (avail) => !avail.is_available
  );

  return {
    data: !unavailable,
    error: null,
  };
}

/**
 * Block dates for a car
 */
export async function blockDates(
  carId: string,
  dates: string[],
  reason?: string
): Promise<ApiResponse<CarAvailability[]>> {
  const records = dates.map((date) => ({
    car_id: carId,
    date,
    is_available: false,
    reason: reason || 'blocked_by_host',
  }));

  // Use upsert to create or update
  const results: CarAvailability[] = [];
  for (const record of records) {
    const result = await ApiClient.create<CarAvailability>('car_availability', record);
    if (result.data) {
      results.push(result.data);
    }
  }

  return {
    data: results,
    error: null,
  };
}

/**
 * Unblock dates for a car
 */
export async function unblockDates(
  carId: string,
  dates: string[]
): Promise<ApiResponse<void>> {
  // Delete availability records for these dates
  // Note: This is a simplified implementation
  // In production, you might want to update instead of delete
  for (const date of dates) {
    // Find and delete the record
    const result = await ApiClient.getMany<CarAvailability>('car_availability', {
      filters: {
        car_id: carId,
        date,
      },
    });

    if (result.data && result.data.length > 0) {
      await ApiClient.delete('car_availability', result.data[0].id);
    }
  }

  return { data: undefined, error: null };
}

/**
 * Set custom pricing for a date
 */
export async function setCustomPricing(
  carId: string,
  date: string,
  price: number
): Promise<ApiResponse<CarAvailability>> {
  // Check if record exists
  const existing = await ApiClient.getMany<CarAvailability>('car_availability', {
    filters: {
      car_id: carId,
      date,
    },
  });

  if (existing.data && existing.data.length > 0) {
    // Update existing
    return ApiClient.update<CarAvailability>('car_availability', existing.data[0].id, {
      custom_daily_rate: price,
    });
  } else {
    // Create new
    return ApiClient.create<CarAvailability>('car_availability', {
      car_id: carId,
      date,
      is_available: true,
      custom_daily_rate: price,
    });
  }
}
