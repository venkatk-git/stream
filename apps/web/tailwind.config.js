/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,html}',
    './pages/**/*.{ts,tsx,html}',
    './components/**/*.{ts,tsx,html}',
    './app/**/*.{ts,tsx,html}',
  ],

  theme: {
    extend: {
      colors: {
        // black
        'black-100': '#FFFFFF0d',
        'black-200': '#262626',
        'black-300': '#171717',
        'black-400': '#0A0A0A',
        // gray
        'gray-900': '#1A1A1A',
        'gray-800': '#333333',
        'gray-700': '#4D4D4D',
        'gray-600': '#666666',
        'gray-500': '#808080',
        'gray-400': '#999999',
        'gray-300': '#B3B3B3',
        'gray-200': '#CCCCCC',
        'gray-100': '#E6E6E6',
        // border
        border: 'rgb(51 51 51 / var(--tw-border-opacity))',
      },
      backgroundImage: {
        'border-gradient':
          'linear-gradient(to right, #0000 5%, #dc2626 35%, #dc2626 50%, #dc2626 65%, #0000 95%)',
      },
    },
  },
  plugins: [],
};
