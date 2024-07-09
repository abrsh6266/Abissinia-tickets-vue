export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/apollo",
    "@nuxtjs/color-mode",
    "@nuxt/image-edge",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "@vee-validate",
  ],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },

  image: {
    domains: ["rickandmortyapi.com"],
  },

  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    classSuffix: "",
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://abyssinia-44.hasura.app/v1/graphql',
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': 'HlKJXyNqxwpzmNcJ1stLCU9Oao1kEildctclrARywis0J7jYmWGPtfcSBrSuUjSB'
        }
      }
    }
  },

  compatibilityDate: "2024-07-03",
});
