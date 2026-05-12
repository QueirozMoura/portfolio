import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        cyan: '0 0 30px rgba(0, 166, 224, 0.25)',
        neon: '0 0 0 1px rgba(123, 208, 255, 0.35), 0 0 24px rgba(123, 208, 255, 0.2)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at 20% 10%, rgba(0,166,224,0.25), transparent 40%), radial-gradient(circle at 80% 0%, rgba(189,194,255,0.2), transparent 45%)',
      },
    },
  },
  plugins: [],
}

export default config
