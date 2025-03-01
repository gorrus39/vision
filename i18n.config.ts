export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en: {
      welcome: "Welcome",
      header: {
        "select-a-language": "SELECT A LANGUAGE",
        select: "SELECT",
      },
    },
    ru: {
      welcome: "велкам",
      header: {
        "select-a-language": "ВЫБЕРИТЕ ЯЗЫК",
        select: "ВЫБОР",
      },
    },
    cn: {
      welcome: "велкам",
      header: {
        "select-a-language": "ВЫБЕРИТЕ ЯЗЫК K",
        select: "ВЫБОР K",
      },
    },
  },
}));
