/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#101415',
        surface: '#101415',
        surfaceContainerLowest: '#0b0f10',
        surfaceContainerLow: '#191c1e',
        surfaceContainer: '#1d2022',
        surfaceContainerHigh: '#272a2c',
        surfaceContainerHighest: '#323537',
        primary: '#c1c6db',
        secondary: '#7bd0ff',
        tertiary: '#bdc2ff',
        onSurface: '#e0e3e5',
        onSurfaceVariant: '#c6c6cd',
        outlineVariant: '#45464c',
        primaryContainer: '#0b1120',
        secondaryContainer: '#00a6e0',
        onSecondary: '#00354a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(123, 208, 255, 0.35), 0 0 30px rgba(123, 208, 255, 0.15)',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at 20% 20%, rgba(123,208,255,0.14), transparent 45%), radial-gradient(circle at 80% 0%, rgba(189,194,255,0.10), transparent 40%)',
      },
    },
  },
  plugins: [],
}
