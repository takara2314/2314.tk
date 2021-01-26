module.exports = {
  purge: {
    enabled: true,
    content: [
      './assets/ts/**/*.{ts,tsx}',
      './assets/html/index.html'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
