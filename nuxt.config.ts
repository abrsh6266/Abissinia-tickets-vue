export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/apollo",
    "@nuxtjs/color-mode",
    "@nuxt/image-edge",
    "@pinia/nuxt",
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
        httpEndpoint: "https://rickandmortyapi.com/graphql",
      },
    },
  },

  compatibilityDate: "2024-07-03",
});
