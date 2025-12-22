import { ApiClient } from './base';
import type { Car, CarImage, CarAvailability, CarSearchResult } from '@/types';
import type { ApiResponse } from '@/types';

export interface CarSearchParams {
  location?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  pickup_date?: string;
  return_date?: string;
  transmission?: 'manual' | 'automatic';
  fuel_type?: 'petrol' | 'diesel' | 'cng' | 'electric' | 'hybrid';
  min_seats?: number;
  max_seats?: number;
  min_price?: number;
  max_price?: number;
  features?: string[];
  instant_booking?: boolean;
  sort_by?: 'distance' | 'price_asc' | 'price_desc' | 'rating';
  page?: number;
  limit?: number;
}

/**
 * Get all cars with optional filters
 */
export async function getCars(
  params?: CarSearchParams & { host_id?: string }
): Promise<ApiResponse<CarSearchResult[]>> {
  const filters: Record<string, unknown> = {};
  
  // If host_id is provided, get all cars for that host (for My Cars page)
  if (params?.host_id) {
    filters.host_id = params.host_id;
  } else {
    // Otherwise, only show active cars
    filters.status = 'active';
  }

  // Apply other filters
  if (params?.transmission) filters.transmission = params.transmission;
  if (params?.fuel_type) filters.fuel_type = params.fuel_type;

  return ApiClient.getMany<CarSearchResult>('cars', {
    select: '*',
    filters,
    orderBy: params?.sort_by === 'price_asc' ? { column: 'daily_rate', ascending: true } : { column: 'created_at', ascending: false },
    limit: params?.limit || 20,
    offset: params?.page ? (params.page - 1) * (params.limit || 20) : undefined,
  });
}

/**
 * Get single car by ID
 */
export async function getCar(id: string): Promise<ApiResponse<Car>> {
  return ApiClient.getOne<Car>('cars', id);
}

/**
 * Create new car
 */
export async function createCar(data: Partial<Car>): Promise<ApiResponse<Car>> {
  return ApiClient.create<Car>('cars', data);
}

/**
 * Update car
 */
export async function updateCar(id: string, data: Partial<Car>): Promise<ApiResponse<Car>> {
  return ApiClient.update<Car>('cars', id, data);
}

/**
 * Delete car
 */
export async function deleteCar(id: string): Promise<ApiResponse<void>> {
  return ApiClient.delete('cars', id);
}

/**
 * Upload car image
 */
export async function uploadCarImage(
  carId: string,
  file: File,
  isPrimary = false,
  displayOrder = 0
): Promise<ApiResponse<CarImage>> {
  // This will be implemented with Supabase Storage
  // For now, return a placeholder
  return {
    data: null,
    error: {
      message: 'Image upload not yet implemented',
    },
  };
}

/**
 * Delete car image
 */
export async function deleteCarImage(imageId: string): Promise<ApiResponse<void>> {
  return ApiClient.delete('car_images', imageId);
}

/**
 * Get car availability
 */
export async function getCarAvailability(
  carId: string,
  startDate?: string,
  endDate?: string
): Promise<ApiResponse<CarAvailability[]>> {
  return ApiClient.getMany<CarAvailability>('car_availability', {
    filters: {
      car_id: carId,
      ...(startDate && endDate ? {} : {}), // Add date range filter if needed
    },
  });
}
