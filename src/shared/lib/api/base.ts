import { supabase } from '@/shared/lib/supabase';
import { handleApiError, logApiRequest, logApiResponse, logApiError } from '@/utils/errors';
import type { ApiResponse, ApiError } from '@/types';

/**
 * Base API client with error handling and logging
 */
export class ApiClient {
  /**
   * Execute a Supabase query with error handling
   */
  static async execute<T>(
    operation: () => Promise<{ data: T | null; error: unknown }>
  ): Promise<ApiResponse<T>> {
    try {
      logApiRequest('QUERY', 'supabase');
      const result = await operation();
      
      if (result.error) {
        throw result.error;
      }

      logApiResponse('QUERY', 'supabase', 200, result.data);
      return {
        data: result.data,
        error: null,
      };
    } catch (error) {
      logApiError('QUERY', 'supabase', error);
      const apiError = handleApiError(error);
      return {
        data: null,
        error: apiError,
      };
    }
  }

  /**
   * Get single record
   */
  static async getOne<T>(
    table: string,
    id: string,
    select = '*'
  ): Promise<ApiResponse<T>> {
    return this.execute(async () => {
      return await supabase.from(table).select(select).eq('id', id).single();
    });
  }

  /**
   * Get multiple records
   */
  static async getMany<T>(
    table: string,
    options?: {
      select?: string;
      filters?: Record<string, unknown>;
      orderBy?: { column: string; ascending?: boolean };
      limit?: number;
      offset?: number;
    }
  ): Promise<ApiResponse<T[]>> {
    return this.execute(async () => {
      let query = supabase.from(table).select(options?.select || '*');

      // Apply filters
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options?.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      // Apply pagination
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      return await query;
    });
  }

  /**
   * Create record
   */
  static async create<T>(
    table: string,
    data: Partial<T>
  ): Promise<ApiResponse<T>> {
    return this.execute(async () => {
      return await supabase.from(table).insert(data).select().single();
    });
  }

  /**
   * Update record
   */
  static async update<T>(
    table: string,
    id: string,
    data: Partial<T>
  ): Promise<ApiResponse<T>> {
    return this.execute(async () => {
      return await supabase.from(table).update(data).eq('id', id).select().single();
    });
  }

  /**
   * Delete record
   */
  static async delete(table: string, id: string): Promise<ApiResponse<void>> {
    return this.execute(async () => {
      const result = await supabase.from(table).delete().eq('id', id);
      return { data: null, error: result.error };
    });
  }
}
