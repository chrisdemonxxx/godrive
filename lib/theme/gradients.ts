/**
 * Gradient definitions for premium design
 */

import { colors } from './colors';

export const gradients = {
  // Primary button gradient
  primary: 'linear-gradient(135deg, #00F0FF 0%, #8B5CF6 100%)',
  primaryHover: 'linear-gradient(135deg, #5FFBFF 0%, #A78BFA 100%)',
  
  // Light theme primary gradient
  primaryLight: 'linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)',
  
  // Aurora gradient (hero backgrounds)
  aurora: 'linear-gradient(135deg, #00F0FF 0%, #00FF88 25%, #8B5CF6 50%, #FF006E 75%, #FFD700 100%)',
  
  // Card backgrounds
  card: 'linear-gradient(180deg, rgba(139, 92, 246, 0.08) 0%, rgba(0, 240, 255, 0.04) 100%)',
  cardHover: 'linear-gradient(180deg, rgba(139, 92, 246, 0.12) 0%, rgba(0, 240, 255, 0.06) 100%)',
  
  // Light theme card
  cardLight: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(249, 250, 251, 1) 100%)',
  
  // Glass effect
  glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
  
  // Text gradients
  textPrimary: 'linear-gradient(135deg, #00F0FF 0%, #8B5CF6 50%, #FF006E 100%)',
  textPrimaryLight: 'linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)',
  textGold: 'linear-gradient(135deg, #FFD700 0%, #FF8C42 100%)',
  
  // Status gradients
  success: 'linear-gradient(135deg, #00FF88 0%, #00D9FF 100%)',
  premium: 'linear-gradient(135deg, #FFD700 0%, #FF006E 50%, #8B5CF6 100%)',
  
  // Background orbs
  orbCyan: 'radial-gradient(ellipse, rgba(0, 240, 255, 0.15) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)',
  orbMagenta: 'radial-gradient(ellipse, rgba(255, 0, 110, 0.1) 0%, rgba(139, 92, 246, 0.06) 40%, transparent 70%)',
  orbGreen: 'radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 60%)',
};

export type GradientScheme = typeof gradients;

