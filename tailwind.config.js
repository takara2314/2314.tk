module.exports = {
  purge: {
    enabled: false,
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
