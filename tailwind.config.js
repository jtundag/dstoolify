// npx tailwind build renderer/resources/tailwind/main.css -o renderer/resources/scss/vendors/_tailwind.scss

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#2b2b2b',
          default: '#323130',
          lighter: '#404040',
          lightest: '#9F9F9F'
        },
        content: {
          default: '#5B5B5B'
        },
        'smoke-darkest': 'rgba(0, 0, 0, 0.9)',
        'smoke-darker': 'rgba(0, 0, 0, 0.75)',
        'smoke-dark': 'rgba(0, 0, 0, 0.6)',
        'smoke': 'rgba(0, 0, 0, 0.5)',
        'smoke-light': 'rgba(0, 0, 0, 0.4)',
        'smoke-lighter': 'rgba(0, 0, 0, 0.25)',
        'smoke-lightest': 'rgba(0, 0, 0, 0.1)'
      }
    }
  },
  variants: {},
  plugins: []
}
