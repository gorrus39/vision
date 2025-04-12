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
    "nuxt-anchorscroll",
  ],
  i18n: {
    strategy: "prefix",
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: ["en", "ru", "cn"], // used in URL path prefix
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
      Roboto: {
        wght: [400, 600, 700],
      },
      Liter: {
        wght: [400, 700],
      },
      "Bebas Neue": {
        wght: [400, 700],
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
  anchorscroll: {
    hooks: [
      // Or any valid hook if needed
      // Default is `page:finish`
      "page:transition:finish",
    ],
  },
})
