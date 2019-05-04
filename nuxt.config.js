import pkg from './package'

const BASE_URL = 'https://mogul-a2928.firebaseapp.com'

export default {
  mode: 'spa',

  srcDir: 'app',

  /*
   ** Headers of the page
   */
  head: {
    title: `Mogul ⛷ | ${pkg.description}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@__Mitsui' },
      { hid: 'og:url', property: 'og:url', content: BASE_URL },
      { hid: 'og:title', property: 'og:title', content: 'Mogul lang' },
      { hid: 'og:description', property: 'og:description', content: pkg.description },
      { hid: 'og:image', property: 'og:image', content: `${BASE_URL}/og_image.png` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Source+Code+Pro:400,600,700|Yellowtail'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/sanitize.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  server: {
    port: 3333
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      })
    }
  }
}
