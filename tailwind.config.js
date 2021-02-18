module.exports = {
  purge: {
    enabled: true,
    content: [
      './assets/ts/**/*.{ts,tsx}',
      './assets/html/index.html',
      './memos/**/*.html'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'black-opacity-75': 'rgba(0, 0, 0, 0.75)',
        'black-opacity-50': 'rgba(0, 0, 0, 0.5)',
        'black-opacity-25': 'rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        'sans': ['Inter', 'M PLUS', 'Meiryo', 'sans-serif']
      },
      spacing: {
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        '7/24': '29.166667%'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
