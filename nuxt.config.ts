// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/css/global.css"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/i18n",
    "@nuxthub/core",
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
  ],
  i18n: {
    strategy: "prefix",
    // vueI18n: './i18n.config.ts', // if you are using custom path, default
    locales: ["ru", "en", "cn", "fr", "sp"], // used in URL path prefix
    defaultLocale: "en", // default locale of your project for Nuxt pages and routings
  },
  googleFonts: {
    download: true,
    families: {
      Poppins: {
        // regular, medium, semibold, bold, extrabold
        wght: [400, 700],
        // ital: [],
      },
      "Bebas Neue": {
        wght: [400],
      },
    },
  },
  image: {},
});
