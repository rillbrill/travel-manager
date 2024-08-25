import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        logo: 'var(--font-logo)',
      },
      // colors
      colors: {
        primary: {
          default: 'var(--teal-400)',
          50: 'var(--teal-50)',
          100: 'var(--teal-100)',
          200: 'var(--teal-200)',
          300: 'var(--teal-300)',
          500: 'var(--teal-500)',
          600: 'var(--teal-600)',
          700: 'var(--teal-700)',
          800: 'var(--teal-800)',
          900: 'var(--teal-900)',
        },
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        blue: {
          50: 'var(--blue-50)',
          100: 'var(--blue-100)',
          200: 'var(--blue-200)',
          300: 'var(--blue-300)',
          400: 'var(--blue-400)',
          500: 'var(--blue-500)',
          600: 'var(--blue-600)',
          700: 'var(--blue-700)',
          800: 'var(--blue-800)',
          900: 'var(--blue-900)',
        },
      },
      boxShadow: {
        container: '0px 0px 16px rgb(50 50 50 / 12%)',
        bottom: '0px 4px 16px rgb(50 50 50 / 8%)',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) =>
      addUtilities({
        '.layout': {
          '@apply mx-auto max-w-lg lg:max-w-5xl lg:flex lg:gap-x-10': '',
        },
        '.container': {
          '@apply max-w-lg mx-auto min-h-dvh': '',
        },
        '.no-scrollbar': {
          /* Hide scrollbar for modern browsers */
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
        },
        '.outline-button': {
          '@apply border border-blue-500 bg-transparent text-blue-500': '',
        },
      })
    ),
  ],
}
