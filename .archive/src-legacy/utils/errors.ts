import { PostgrestError } from '@supabase/supabase-js';

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * Handle Supabase API errors and convert to user-friendly messages
 */
export function handleApiError(error: unknown): ApiError {
  if (error instanceof Error) {
    // Check if it's a Supabase PostgrestError
    if ('code' in error && 'details' in error) {
      const supabaseError = error as PostgrestError;
      return {
        message: getSupabaseErrorMessage(supabaseError),
        code: supabaseError.code,
        details: supabaseError.details as Record<string, unknown>,
      };
    }

    // Regular Error
    return {
      message: error.message,
    };
  }

  // Unknown error type
  return {
    message: 'An unexpected error occurred. Please try again.',
  };
}

/**
 * Get user-friendly error message from Supabase error
 */
function getSupabaseErrorMessage(error: PostgrestError): string {
  const code = error.code;

  // Common Supabase error codes
  switch (code) {
    case '23505': // Unique violation
      return 'This record already exists. Please use a different value.';
    case '23503': // Foreign key violation
      return 'This record is referenced by other data and cannot be deleted.';
    case '23502': // Not null violation
      return 'Required fields are missing. Please fill in all required fields.';
    case 'PGRST116': // No rows returned
      return 'No data found.';
    case '42501': // Insufficient privilege
      return 'You do not have permission to perform this action.';
    case '42P01': // Undefined table
      return 'Database error. Please contact support.';
    default:
      return error.message || 'An error occurred. Please try again.';
  }
}

/**
 * Extract error message from any error type
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Log error (will be replaced with Sentry later)
 */
export function logError(error: unknown, context?: string): void {
  const errorMessage = getErrorMessage(error);
  const logMessage = context ? `[${context}] ${errorMessage}` : errorMessage;

  if (import.meta.env.DEV) {
    console.error(logMessage, error);
  } else {
    // In production, send to error tracking service
    // TODO: Integrate Sentry
    console.error(logMessage);
  }
}

/**
 * Log API request (for debugging)
 */
export function logApiRequest(method: string, url: string, data?: unknown): void {
  if (import.meta.env.DEV) {
    console.log(`[API Request] ${method} ${url}`, data);
  }
}

/**
 * Log API response (for debugging)
 */
export function logApiResponse(method: string, url: string, data?: unknown): void {
  if (import.meta.env.DEV) {
    console.log(`[API Response] ${method} ${url}`, data);
  }
}

/**
 * Log API error (for debugging)
 */
export function logApiError(method: string, url: string, error: unknown): void {
  const errorMessage = getErrorMessage(error);
  if (import.meta.env.DEV) {
    console.error(`[API Error] ${method} ${url}`, errorMessage, error);
  } else {
    // In production, send to error tracking service
    console.error(`[API Error] ${method} ${url}`, errorMessage);
  }
}
