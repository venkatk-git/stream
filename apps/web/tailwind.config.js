const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
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
