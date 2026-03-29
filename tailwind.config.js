/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'mincho': ['"Sawarabi Mincho"', 'serif'],
      },
    },
  },
  plugins: [],
}
