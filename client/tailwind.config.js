module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'geometric-twinkle': 'geometric-twinkle 10s ease-in-out infinite',
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ...other plugins
  ],
}