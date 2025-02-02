// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
				compatibilityDate: "2024-11-01",
				devtools: { enabled: false },
				modules: ["@nuxtjs/i18n", "@nuxthub/core", "@nuxt/ui"],
				i18n: {
								strategy: "prefix",
								vueI18n: "./i18n.config.ts", // if you are using custom path, default
								locales: ["ru", "en", "cn", "fr"], // used in URL path prefix
								defaultLocale: "fr", // default locale of your project for Nuxt pages and routings
				},
})