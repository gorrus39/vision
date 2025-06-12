export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      secondary: "teal",
    },
    iconsExt: {
      github: "i-simple-icons:github",
      add: "i-ep:circle-plus-filled",
      delete: "i-mdi-light:delete",
      edit: "i-heroicons-pencil-square",
      submit: "fa-solid:arrow-alt-circle-up",
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
