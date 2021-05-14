const BASEURL = '/wow-number-keys/'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  loading: {
    color: 'blue',
    height: '5px',
  },

  router: {
    base: BASEURL,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mythics-keys',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/KeyFinder.ts',
      mode: 'client',
    },
    {
      src: '~/plugins/Character.ts',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['nuxt-buefy', { css: false }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/keys/': {
      target: 'https://raider.io/api/characters/mythic-plus-runs',
      pathRewrite: { '^/keys/': '' },
    },
    '/char/': {
      target: 'https://raider.io/api/characters/eu/draenor',
      pathRewrite: { '^/char/': '' },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
