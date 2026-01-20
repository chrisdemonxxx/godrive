/**
 * Environment variable validation and type-safe access
 */

const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
] as const;

const optionalEnvVars = [
  'VITE_RAZORPAY_KEY_ID',
  'VITE_GOOGLE_MAPS_API_KEY',
  'VITE_APP_URL',
  'VITE_APP_ENV',
] as const;

type RequiredEnvVar = typeof requiredEnvVars[number];
type OptionalEnvVar = typeof optionalEnvVars[number];

interface EnvConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  razorpay?: {
    keyId: string;
  };
  googleMaps?: {
    apiKey: string;
  };
  app: {
    url: string;
    env: 'development' | 'production' | 'test';
  };
}

/**
 * Validate that all required environment variables are present
 */
export function validateEnv(): void {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!import.meta.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        'Please check your .env.local file.'
    );
  }
}

/**
 * Get environment variable value
 */
function getEnvVar(name: RequiredEnvVar | OptionalEnvVar): string | undefined {
  return import.meta.env[name];
}

/**
 * Get validated environment configuration
 */
export function getEnvConfig(): EnvConfig {
  validateEnv();

  return {
    supabase: {
      url: getEnvVar('VITE_SUPABASE_URL')!,
      anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY')!,
    },
    razorpay: getEnvVar('VITE_RAZORPAY_KEY_ID')
      ? {
          keyId: getEnvVar('VITE_RAZORPAY_KEY_ID')!,
        }
      : undefined,
    googleMaps: getEnvVar('VITE_GOOGLE_MAPS_API_KEY')
      ? {
          apiKey: getEnvVar('VITE_GOOGLE_MAPS_API_KEY')!,
        }
      : undefined,
    app: {
      url: getEnvVar('VITE_APP_URL') || 'http://localhost:5173',
      env: (getEnvVar('VITE_APP_ENV') as EnvConfig['app']['env']) || 'development',
    },
  };
}

/**
 * Check if running in development
 */
export function isDev(): boolean {
  return getEnvConfig().app.env === 'development';
}

/**
 * Check if running in production
 */
export function isProd(): boolean {
  return getEnvConfig().app.env === 'production';
}
