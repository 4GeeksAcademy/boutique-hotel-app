const theme = require('./src/styles/theme.js');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: theme.fonts,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ...other plugins
  ],
}