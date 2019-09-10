import webpack from 'webpack'

export default {
  mode: 'spa',
  build: {
    extend: (config) => {
      config.target = 'electron-renderer';
    },
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ]
  },
  plugins: [
    '~/plugins/nuxtron',
    '~/plugins/init_plugins',
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ]
}
