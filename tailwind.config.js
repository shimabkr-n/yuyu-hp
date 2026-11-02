/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './en/index.html',
    './zh-hant/index.html',
    './ko/index.html',
    './404.html',
    './scripts/build-i18n.js',
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
