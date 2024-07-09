export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://abyssinia-44.hasura.app/v1/graphql',
        httpLinkOptions: {
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'HlKJXyNqxwpzmNcJ1stLCU9Oao1kEildctclrARywis0J7jYmWGPtfcSBrSuUjSB'
          }
        }
      }
    }
  },
  axios: {
    baseURL: 'https://abyssinia-44.hasura.app/v1/graphql',
    headers: {
      common: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'HlKJXyNqxwpzmNcJ1stLCU9Oao1kEildctclrARywis0J7jYmWGPtfcSBrSuUjSB'
      }
    }
  },
  auth: {
    strategies: {
      customStrategy: {
        scheme: 'local',
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          autoFetch: false
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: false,
          user: false
        }
      }
    }
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true
  },
  compilerOptions: {
    types: ['@nuxtjs/auth-next']
  },
  image: {
    domains: ['rickandmortyapi.com']
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
  compatibilityDate: '2024-07-03'
})