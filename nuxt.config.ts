// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/css/fonts.css", "~/assets/css/global.css"],
  compatibilityDate: "2024-11-01",
  app: {
    head: {
      title: "Vision",
    },
  },
  // sourcemap: {
  //   server: true,
  //   client: true,
  // },
  devtools: {
    enabled: true,
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxthub/core",
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "nuxt-tiptap-editor",
  ],
  i18n: {
    strategy: "prefix",
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
    locales: ["ru", "en", "cn"], // used in URL path prefix
    defaultLocale: "en", // default locale of your project for Nuxt pages and routings
  },
  runtimeConfig: {},
  googleFonts: {
    download: true,
    families: {
      // Poppins: {
      //   // regular, medium, semibold, bold, extrabold
      //   wght: [400, 600, 700],
      //   // ital: [],
      // },
      "Bebas Neue": {
        wght: [400],
      },
      Inter: {
        wght: [300],
      },
    },
  },
  image: {
    format: ["png", "webp"],
  },
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
  hub: {
    database: true,
    // remote: true,
    blob: true,
  },
});
