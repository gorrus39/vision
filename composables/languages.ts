import type { Language } from "~/types/admin"

export const useLanguages = (): Language[] => {
  const { ui } = useAppConfig()
  const languages: Language[] = [
    {
      label: "Russian",
      icon: ui.iconsExt.ru,
      value: "ru",
    },
    {
      label: "English",
      icon: ui.iconsExt.en,
      value: "en",
    },
    {
      label: "Chineese",
      icon: ui.iconsExt.cn,
      value: "cn",
    },
  ]
  return languages
}
