/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'blue-main': '#53ACFF',
        'rose-main': '#EE88FF',
        'black-opacity': 'rgba(0, 0, 0, 0.2)'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      boxShadow: {
        fine: '0px 0px 90px 0px rgba(0, 0, 0, 0.20);'
      }
    },
  },
  plugins: [],
}
