/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@headlessui/react/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '400': '400ms',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        'custom-bg': '#FFFEFC',
        'custom-bgs': '#A66B37',
        'custom-border': '#18191F',
        'custom-yellow': '#F7B602',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeIn: 'fadeIn 1s ease-out',
      },
    },
  },
  plugins: [
  ],
}