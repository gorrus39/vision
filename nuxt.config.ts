// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/css/fonts.css", "~/assets/css/main.css"],
  compatibilityDate: "2024-11-01",
  app: {
    head: {
      title: "Vision",
    },
  },
  sourcemap: {
    server: true,
    client: true,
  },
  devtools: {
    enabled: true,
  },
  // debug: true,
  modules: [
    "@nuxtjs/i18n",
    "@nuxthub/core",
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "nuxt-tiptap-editor",
    "nuxt-anchorscroll",
    "nuxt-auth-utils",
  ],
  i18n: {
    strategy: "prefix",
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: ["en", "ru", "cn"], // used in URL path prefix
    defaultLocale: "en", // default locale of your project for Nuxt pages and routings
  },
  runtimeConfig: {
    public: {
      links: {
        telegram: "#",
        signal: "#",
        watsapp: "#",
      },
    },
  },
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
    prefix: "Tiptap",
  },
  hub: {
    database: true,
    // remote: true,
    blob: true,
  },
  anchorscroll: {
    hooks: [
      // Default is `page:finish`
      "page:transition:finish",
    ],
  },
})
