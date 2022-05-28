module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '"M PLUS 1p"', 'Meiryo', 'sans-serif']
      }
    }
  },
  plugins: [require("daisyui")]
};
