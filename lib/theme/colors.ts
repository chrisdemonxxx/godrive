/**
 * Theme color definitions for both dark (premium) and light themes
 */

export const colors = {
  // === BACKGROUNDS ===
  bg: {
    // Primary backgrounds (Deep Space - Dark Theme)
    primary: '#030014',       // Main background - almost black with blue undertone
    secondary: '#0a0118',     // Slightly lighter for sections
    tertiary: '#120826',      // Cards and elevated surfaces
    quaternary: '#1a0f2e',    // Hover states on cards
    
    // Glass effects
    glass: 'rgba(255, 255, 255, 0.03)',
    glassHover: 'rgba(255, 255, 255, 0.06)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
    glassStrong: 'rgba(255, 255, 255, 0.1)',
    
    // Overlays
    overlay: 'rgba(3, 0, 20, 0.8)',
    overlayStrong: 'rgba(3, 0, 20, 0.95)',

    // Light theme backgrounds
    light: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      quaternary: '#e5e7eb',
    },
  },
  
  // === ACCENT COLORS ===
  accent: {
    // Primary - Electric Cyan (Main brand color)
    cyan: '#00F0FF',
    cyanLight: '#5FFBFF',
    cyanDark: '#00B8C4',
    cyanGlow: 'rgba(0, 240, 255, 0.4)',
    cyanSubtle: 'rgba(0, 240, 255, 0.1)',
    
    // Secondary - Hot Magenta (CTAs, alerts)
    magenta: '#FF006E',
    magentaLight: '#FF4D94',
    magentaDark: '#CC0058',
    magentaGlow: 'rgba(255, 0, 110, 0.4)',
    magentaSubtle: 'rgba(255, 0, 110, 0.1)',
    
    // Tertiary - Vivid Purple (Premium, badges)
    purple: '#8B5CF6',
    purpleLight: '#A78BFA',
    purpleDark: '#7C3AED',
    purpleGlow: 'rgba(139, 92, 246, 0.4)',
    purpleSubtle: 'rgba(139, 92, 246, 0.1)',
    
    // Success - Neon Green
    green: '#00FF88',
    greenLight: '#5FFFA8',
    greenDark: '#00CC6A',
    greenGlow: 'rgba(0, 255, 136, 0.4)',
    greenSubtle: 'rgba(0, 255, 136, 0.1)',
    
    // Premium - Gold
    gold: '#FFD700',
    goldLight: '#FFDF4D',
    goldDark: '#CCB000',
    goldGlow: 'rgba(255, 215, 0, 0.4)',
    goldSubtle: 'rgba(255, 215, 0, 0.1)',
    
    // Soft accents
    rose: '#FF7EB3',
    orange: '#FF8C42',
    teal: '#00D9FF',

    // Light theme primary (blue)
    blue: '#0066FF',
    blueLight: '#3F83F8',
    blueDark: '#0052CC',
  },
  
  // === TEXT COLORS ===
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.4)',
    muted: 'rgba(255, 255, 255, 0.25)',
    inverse: '#030014',

    // Light theme text
    light: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
      muted: '#d1d5db',
    },
  },
  
  // === STATUS COLORS ===
  status: {
    success: '#00FF88',
    warning: '#FFD700',
    error: '#FF006E',
    info: '#00F0FF',
    pending: '#8B5CF6',
  },
  
  // === BORDER COLORS ===
  border: {
    subtle: 'rgba(255, 255, 255, 0.05)',
    light: 'rgba(255, 255, 255, 0.08)',
    medium: 'rgba(255, 255, 255, 0.12)',
    strong: 'rgba(255, 255, 255, 0.2)',
    accent: 'rgba(0, 240, 255, 0.3)',
    accentStrong: 'rgba(0, 240, 255, 0.5)',

    // Light theme borders
    lightTheme: {
      subtle: 'rgba(0, 0, 0, 0.05)',
      light: 'rgba(0, 0, 0, 0.1)',
      medium: 'rgba(0, 0, 0, 0.2)',
      strong: 'rgba(0, 0, 0, 0.3)',
    },
  },
};

export type ColorScheme = typeof colors;

