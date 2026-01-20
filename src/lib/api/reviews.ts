import { ApiClient } from './base';
import type { ApiResponse } from '@/types';
import type { ReviewFormData } from '@/schemas/review';
import type { Review } from '@/types';

/**
 * Create a new review
 */
export async function createReview(data: ReviewFormData & { reviewer_id: string; reviewee_id: string }): Promise<ApiResponse<Review>> {
  return ApiClient.create<Review>('reviews', data);
}
