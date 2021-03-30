const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/ts/**/*.{ts,tsx}',
      './src/html/index.html',
      './memos/**/*.html'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'bluegray': colors.blueGray,
        'coolgray': colors.coolGray,
        'gray': colors.gray,
        'truegray': colors.trueGray,
        'warmgray': colors.warmGray,
        'red': colors.red,
        'orange': colors.orange,
        'amber': colors.amber,
        'yellow': colors.yellow,
        'lime': colors.lime,
        'green': colors.green,
        'emerald': colors.emerald,
        'teal': colors.teal,
        'cyan': colors.cyan,
        'lightblue': colors.lightBlue,
        'blue': colors.blue,
        'indigo': colors.indigo,
        'violet': colors.violet,
        'purple': colors.purple,
        'fuchsia': colors.fuchsia,
        'pink': colors.pink,
        'rose': colors.rose,
        'black-opacity-75': 'rgba(0, 0, 0, 0.75)',
        'black-opacity-50': 'rgba(0, 0, 0, 0.5)',
        'black-opacity-25': 'rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        'sans': ['Inter', 'M PLUS', 'Meiryo', 'sans-serif']
      },
      fontSize: {
        '2.5xl': '1.65rem'
      },
      spacing: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
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
        '13': '3.25rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '128': '32rem',
        '144': '36rem'
      },
      lineHeight: {
        '12': '3rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
