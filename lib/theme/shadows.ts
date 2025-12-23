/**
 * Shadow definitions for premium design effects
 */

import { colors } from './colors';

export const shadows = {
  // Glow effects (Dark theme)
  glowCyan: '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)',
  glowCyanStrong: '0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
  glowMagenta: '0 0 20px rgba(255, 0, 110, 0.3)',
  glowPurple: '0 0 20px rgba(139, 92, 246, 0.3)',
  glowGold: '0 0 20px rgba(255, 215, 0, 0.3)',
  glowGreen: '0 0 20px rgba(0, 255, 136, 0.3)',
  
  // Card shadows
  card: '0 4px 20px rgba(0, 0, 0, 0.3)',
  cardHover: '0 8px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 240, 255, 0.1)',
  cardElevated: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 240, 255, 0.05)',
  
  // Light theme card shadows
  cardLight: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  cardLightHover: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  
  // Button shadows
  button: '0 4px 15px rgba(0, 240, 255, 0.3), 0 0 30px rgba(139, 92, 246, 0.15)',
  buttonHover: '0 6px 25px rgba(0, 240, 255, 0.4), 0 0 50px rgba(139, 92, 246, 0.25)',
  
  // Light theme button shadows
  buttonLight: '0 4px 20px rgba(0, 102, 255, 0.15)',
  buttonLightHover: '0 6px 25px rgba(0, 102, 255, 0.25)',
  
  // Modal/Dropdown
  modal: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(0, 240, 255, 0.05)',
  modalLight: '0 25px 50px rgba(0, 0, 0, 0.25)',
};

export type ShadowScheme = typeof shadows;

