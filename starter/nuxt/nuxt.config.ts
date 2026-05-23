export default defineNuxtConfig({
  modules: [],
  runtimeConfig: {
    public: {
      wpGraphqlUrl: process.env.NUXT_PUBLIC_WP_GRAPHQL_URL ?? "https://example.com/graphql"
    }
  },
  routeRules: {
    "/preview/**": { ssr: true, cache: false },
    "/case-studies/**": { swr: 300 },
    "/blog/**": { swr: 300 }
  },
  app: {
    head: {
      titleTemplate: "%s | Headless WP Vue Starter"
    }
  }
});
