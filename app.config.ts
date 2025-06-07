export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      secondary: "teal",
    },
    iconsExt: {
      github: "i-carbon-logo-github",
      delete: "i-mdi-light:delete",
      edit: "i-heroicons-pencil-square",
      ru: "i-circle-flags-ru",
      en: "i-circle-flags-gb",
      cn: "i-circle-flags-cn",
    },
    slideover: {
      variants: {
        side: {
          right: {
            content: "max-w-7xl",
          },
        },
      },
    },
  },
})
