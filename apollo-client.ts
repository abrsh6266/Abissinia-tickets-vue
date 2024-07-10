import { defineApolloClient } from '@nuxtjs/apollo'

export default defineApolloClient({
  httpEndpoint: 'https://abyssinia-44.hasura.app/v1/graphql',
  defaultOptions: {
    $query: {
      fetchPolicy: 'no-cache',
    },
  },
  tokenName: 'apollo-token',
  ssr: true,
  websocketsOnly: false,
  httpLinkOptions: {
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': 'HlKJXyNqxwpzmNcJ1stLCU9Oao1kEildctclrARywis0J7jYmWGPtfcSBrSuUjSB',
    },
  },
})
