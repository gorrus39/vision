import type { ZodSchema } from "zod"
import type { CatalogAdmin, CatalogReward, Lang } from "./catalog"
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
export type StoreType = "faqStore" | "blogStore" | "catalogAdminsStore" | "catalogRewardsStore" | "catalogRewardsStore"

export type FormItem = FullFaqItem | CatalogAdmin | CatalogReward

export interface FormEntries<T extends FormItem> {
  images?: { maxAmount: number }
  schema: ZodSchema
  lang: Ref<Lang>
  emptyItem: T
  handleSubmit: (state: Ref<T>) => Promise<{ error?: string | undefined }>
}

export type AnyItem = Record<string, any>
