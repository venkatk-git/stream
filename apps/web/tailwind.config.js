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
        "black-100": "#FFFFFF0d",
        "black-200": "#262626",
        "black-300": "#171717",
        "black-400": "#0A0A0A",

      },
    },
  },
  plugins: [],
};
