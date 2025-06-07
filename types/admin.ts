import type { Lang } from "./catalog"
import type { FullFaqItem } from "./faq"

export type AdminTableModeLiteral = (typeof A_MODES)[keyof typeof A_MODES]

export type AdminTableMode = {
  label: string
  value: AdminTableModeLiteral
}

export type Language = {
  label: string
  icon: string
  value: Lang
  disabled?: boolean
}

// export type FaqStoreType = ReturnType<typeof useFaqStore>
export type StoreType = "faqStore" | "blogStore"

export type FormItem = FullFaqItem

export interface FormEntries<T extends FormItem> {
  lang: Ref<Lang>
  emptyItem: T
  handleSubmit: (state: Ref<T>) => Promise<{ error?: string | undefined }>
}

export type AnyItem = Record<string, any>
