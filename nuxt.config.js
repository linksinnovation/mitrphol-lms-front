const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Mitrphol LMS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Router config
  */
  router: {
    middleware: 'auth'
  },
  /*
  ** Css Loader
  */
  css: [
    { src: 'animate.css/animate.css' },
    { src: 'bootstrap/dist/css/bootstrap.css' },
    { src: 'font-awesome/css/font-awesome.css' },
    { src: 'material-design-iconic-font/dist/css/material-design-iconic-font.css' },
    { src: '~assets/css/style.light-blue-500.min.css' }
  ],
  /*
  ** Plugins Loader
  */
  plugins: [
    { src: '~plugins/bootstrap' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'jquery',
      'bootstrap',
      'axios'
    ],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
