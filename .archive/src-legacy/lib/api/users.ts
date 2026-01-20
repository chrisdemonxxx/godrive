import { ApiClient } from './base';
import type { User } from '@/types';
import type { ApiResponse } from '@/types';

/**
 * Get user by ID
 */
export async function getUser(id: string): Promise<ApiResponse<User>> {
  return ApiClient.getOne<User>('users', id);
}

/**
 * Update user profile
 */
export async function updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
  return ApiClient.update<User>('users', id, data);
}
