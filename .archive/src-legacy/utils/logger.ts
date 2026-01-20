/**
 * Logging utility with environment-based behavior
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

/**
 * Log info message
 */
export function logInfo(message: string, context?: LogContext): void {
  if (import.meta.env.DEV) {
    console.log(`[INFO] ${message}`, context || '');
  }
}

/**
 * Log warning message
 */
export function logWarn(message: string, context?: LogContext): void {
  if (import.meta.env.DEV) {
    console.warn(`[WARN] ${message}`, context || '');
  }
}

/**
 * Log error message
 */
export function logError(message: string, error?: unknown, context?: LogContext): void {
  if (import.meta.env.DEV) {
    console.error(`[ERROR] ${message}`, error || '', context || '');
  } else {
    // In production, send to error tracking service
    // TODO: Integrate Sentry
    console.error(`[ERROR] ${message}`);
  }
}

/**
 * Log debug message (only in development)
 */
export function logDebug(message: string, context?: LogContext): void {
  if (import.meta.env.DEV) {
    console.debug(`[DEBUG] ${message}`, context || '');
  }
}

/**
 * Structured logger for API requests/responses
 */
export function logApiRequest(
  method: string,
  url: string,
  params?: Record<string, unknown>
): void {
  logDebug(`API Request: ${method} ${url}`, params);
}

export function logApiResponse(
  method: string,
  url: string,
  status: number,
  data?: unknown
): void {
  logDebug(`API Response: ${method} ${url} - ${status}`, { data });
}

export function logApiError(
  method: string,
  url: string,
  error: unknown
): void {
  logError(`API Error: ${method} ${url}`, error);
}
