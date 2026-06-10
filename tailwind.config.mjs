/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#5fbeff',
          blue: '#1e64c9',
          navy: '#0b1d3d',
          ink: '#f1f5fb',
        },
        ink: {
          950: '#06101f',
          900: '#0b1d3d',
          800: '#152a55',
          700: '#1f3a6f',
          600: '#2c4d8a',
          500: '#4a6fa8',
          400: '#7191c4',
          300: '#a0b7d8',
          200: '#cdd9eb',
          100: '#e6edf6',
          50: '#f1f5fb',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tightish: '-0.015em',
        tighter2: '-0.025em',
        tighter3: '-0.03em',
      },
      maxWidth: {
        prose: '68ch',
        page: '76rem',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(60% 80% at 50% 0%, rgba(95,190,255,0.12) 0%, rgba(11,29,61,0) 60%), linear-gradient(180deg, #06101f 0%, #0b1d3d 100%)',
        'card-glow':
          'radial-gradient(120% 80% at 0% 0%, rgba(95,190,255,0.10), rgba(11,29,61,0) 60%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(95,190,255,0.25), 0 24px 60px -20px rgba(95,190,255,0.35)',
      },
    },
  },
  plugins: [],
};
