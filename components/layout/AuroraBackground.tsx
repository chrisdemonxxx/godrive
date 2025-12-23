'use client';

import { useTheme } from '@/components/providers/ThemeProvider';

/**
 * Aurora Background Component
 * 
 * Displays animated gradient orbs and grid pattern overlay.
 * Only visible in dark theme.
 */
export default function AuroraBackground() {
  const { isDark } = useTheme();

  // Don't render in light theme
  if (!isDark) {
    return null;
  }

  return (
    <div className="aurora-background fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Main Cyan Orb - Top Right */}
      <div
        className="aurora-orb"
        style={{
          top: '-30%',
          right: '-20%',
          width: '80vw',
          height: '80vw',
          background: 'radial-gradient(ellipse, rgba(0,240,255,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
        }}
      />
      
      {/* Magenta Orb - Bottom Left */}
      <div
        className="aurora-orb aurora-orb-reverse"
        style={{
          bottom: '-40%',
          left: '-30%',
          width: '90vw',
          height: '90vw',
          background: 'radial-gradient(ellipse, rgba(255,0,110,0.1) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)',
        }}
      />
      
      {/* Green Orb - Center */}
      <div
        className="aurora-orb"
        style={{
          top: '40%',
          left: '30%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 60%)',
          animation: 'float-slow 12s ease-in-out infinite',
        }}
      />
      
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

