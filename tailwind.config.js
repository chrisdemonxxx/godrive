/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand colors (light theme)
        primary: {
          50: '#EBF5FF',
          100: '#E1EFFE',
          200: '#C3DDFD',
          300: '#A4CAFE',
          400: '#76A9FA',
          500: '#3F83F8',
          600: '#0066FF', // Main brand color
          700: '#0052CC',
          800: '#0041A8',
          900: '#003380',
        },
        // Secondary colors
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF6B00', // Action Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Premium dark theme colors
        dark: {
          bg: {
            primary: '#030014',
            secondary: '#0a0118',
            tertiary: '#120826',
            quaternary: '#1a0f2e',
          },
          accent: {
            cyan: '#00F0FF',
            cyanLight: '#5FFBFF',
            cyanDark: '#00B8C4',
            magenta: '#FF006E',
            magentaLight: '#FF4D94',
            purple: '#8B5CF6',
            purpleLight: '#A78BFA',
            green: '#00FF88',
            gold: '#FFD700',
            rose: '#FF7EB3',
            orange: '#FF8C42',
            teal: '#00D9FF',
          },
          text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
            tertiary: 'rgba(255, 255, 255, 0.4)',
            muted: 'rgba(255, 255, 255, 0.25)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'pulse-slow': 'pulse 8s ease-in-out infinite',
        'pulse-reverse': 'pulse 10s ease-in-out infinite reverse',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 1s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.02)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 240, 255, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        // Light theme shadows
        card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        glow: '0 0 40px rgba(0, 102, 255, 0.15)',
        'glow-lg': '0 0 60px rgba(0, 102, 255, 0.2)',
        
        // Dark theme shadows
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)',
        'glow-cyan-strong': '0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
        'glow-magenta': '0 0 20px rgba(255, 0, 110, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.3)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.3)',
        'card-dark': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-dark-hover': '0 8px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 240, 255, 0.1)',
        'card-dark-elevated': '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 240, 255, 0.05)',
        'button-dark': '0 4px 15px rgba(0, 240, 255, 0.3), 0 0 30px rgba(139, 92, 246, 0.15)',
        'button-dark-hover': '0 6px 25px rgba(0, 240, 255, 0.4), 0 0 50px rgba(139, 92, 246, 0.25)',
        modal: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(0, 240, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00F0FF 0%, #8B5CF6 100%)',
        'gradient-primary-hover': 'linear-gradient(135deg, #5FFBFF 0%, #A78BFA 100%)',
        'gradient-primary-light': 'linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #00F0FF 0%, #00FF88 25%, #8B5CF6 50%, #FF006E 75%, #FFD700 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(139, 92, 246, 0.08) 0%, rgba(0, 240, 255, 0.04) 100%)',
        'gradient-card-hover': 'linear-gradient(180deg, rgba(139, 92, 246, 0.12) 0%, rgba(0, 240, 255, 0.06) 100%)',
        'gradient-text-primary': 'linear-gradient(135deg, #00F0FF 0%, #8B5CF6 50%, #FF006E 100%)',
        'gradient-text-primary-light': 'linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)',
        'gradient-text-gold': 'linear-gradient(135deg, #FFD700 0%, #FF8C42 100%)',
        'gradient-success': 'linear-gradient(135deg, #00FF88 0%, #00D9FF 100%)',
        'gradient-premium': 'linear-gradient(135deg, #FFD700 0%, #FF006E 50%, #8B5CF6 100%)',
        'orb-cyan': 'radial-gradient(ellipse, rgba(0, 240, 255, 0.15) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)',
        'orb-magenta': 'radial-gradient(ellipse, rgba(255, 0, 110, 0.1) 0%, rgba(139, 92, 246, 0.06) 40%, transparent 70%)',
        'orb-green': 'radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 60%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
