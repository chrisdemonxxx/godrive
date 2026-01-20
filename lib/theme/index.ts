/**
 * Theme configuration export
 * 
 * This file exports all theme-related configurations including colors, gradients,
 * shadows, and animations for both dark (premium) and light themes.
 */

import { colors } from './colors';
import { gradients } from './gradients';
import { shadows } from './shadows';
import { animations } from './animations';

export { colors, gradients, shadows, animations };

export type { ColorScheme } from './colors';
export type { GradientScheme } from './gradients';
export type { ShadowScheme } from './shadows';
export type { AnimationScheme } from './animations';

/**
 * Theme utilities
 */
export const theme = {
  colors,
  gradients,
  shadows,
  animations,
};

export default theme;

