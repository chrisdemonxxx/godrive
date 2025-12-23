/**
 * Environment variable validation
 * Ensures all required environment variables are present and valid
 */

interface EnvSchema {
  [key: string]: {
    required?: boolean;
    type?: 'string' | 'number' | 'boolean';
    description?: string;
  };
}

const envSchema: EnvSchema = {
  // Supabase
  VITE_SUPABASE_URL: {
    required: true,
    type: 'string',
    description: 'Supabase project URL',
  },
  VITE_SUPABASE_ANON_KEY: {
    required: true,
    type: 'string',
    description: 'Supabase anonymous key',
  },

  // Razorpay
  VITE_RAZORPAY_KEY_ID: {
    required: false, // Optional for development
    type: 'string',
    description: 'Razorpay key ID',
  },

  // Google Maps
  VITE_GOOGLE_MAPS_API_KEY: {
    required: false,
    type: 'string',
    description: 'Google Maps JavaScript API key',
  },

  // App
  VITE_APP_URL: {
    required: false,
    type: 'string',
    description: 'Application URL',
  },
  VITE_APP_ENV: {
    required: false,
    type: 'string',
    description: 'Application environment (development, production)',
  },
};

export function validateEnv(): void {
  // Skip validation during build time (SSR/build environments)
  if (typeof window === 'undefined') {
    return;
  }

  // Skip validation in development mode with placeholder values
  const isDevelopment = import.meta.env.VITE_APP_ENV === 'development' || 
                        import.meta.env.MODE === 'development';
  const hasPlaceholderValues = 
    import.meta.env.VITE_SUPABASE_URL?.includes('placeholder') ||
    import.meta.env.VITE_SUPABASE_ANON_KEY === 'placeholder-anon-key';

  if (isDevelopment && hasPlaceholderValues) {
    console.warn('⚠️ Running in development mode with placeholder environment variables. Some features may not work.');
    return;
  }

  const missingVars: string[] = [];
  const invalidVars: string[] = [];

  for (const [varName, config] of Object.entries(envSchema)) {
    const value = import.meta.env[varName];

    // Check if required variable is missing
    if (config.required && !value) {
      missingVars.push(varName);
      continue;
    }

    // Skip validation if variable is not provided and not required
    if (!value) continue;

    // Type validation
    if (config.type === 'number' && isNaN(Number(value))) {
      invalidVars.push(`${varName} must be a number`);
    } else if (config.type === 'boolean' && value !== 'true' && value !== 'false') {
      invalidVars.push(`${varName} must be true or false`);
    }
  }

  if (missingVars.length > 0 || invalidVars.length > 0) {
    let message = 'Environment validation failed:\n\n';

    if (missingVars.length > 0) {
      message += `Missing required variables:\n${missingVars.map(v => `  - ${v}`).join('\n')}\n\n`;
    }

    if (invalidVars.length > 0) {
      message += `Invalid variables:\n${invalidVars.map(v => `  - ${v}`).join('\n')}\n\n`;
    }

    message += 'Please check your .env.local file and ensure all required variables are set.';

    throw new Error(message);
  }
}

/**
 * Get environment variable with type safety
 */
export function getEnvVar<T = string>(
  name: string,
  defaultValue?: T
): T | undefined {
  const value = import.meta.env[name];

  if (!value) return defaultValue;

  const config = envSchema[name];

  if (config?.type === 'number') {
    return Number(value) as T;
  }

  if (config?.type === 'boolean') {
    return (value === 'true') as T;
  }

  return value as T;
}

/**
 * Get all environment variables as a config object
 */
export function getEnvConfig() {
  return {
    supabaseUrl: getEnvVar('VITE_SUPABASE_URL'),
    supabaseAnonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),
    razorpayKeyId: getEnvVar('VITE_RAZORPAY_KEY_ID'),
    googleMapsApiKey: getEnvVar('VITE_GOOGLE_MAPS_API_KEY'),
    appUrl: getEnvVar('VITE_APP_URL', 'http://localhost:5173'),
    appEnv: getEnvVar('VITE_APP_ENV', 'development'),
  };
}