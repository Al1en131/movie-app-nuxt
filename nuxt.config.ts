// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/styles.scss"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      movieApiKey: import.meta.env.NUXT_PUBLIC_MOVIE_API_KEY,
    },
  },
});
