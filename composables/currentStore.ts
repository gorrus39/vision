import type { StoreType } from "~/types/admin"

export function useCurrentStore(storeType: undefined): null
export function useCurrentStore(storeType: "faqStore"): ReturnType<typeof useFaqStore>
export function useCurrentStore(storeType: "blogStore"): ReturnType<typeof useBlogStore>

export function useCurrentStore(
  storeType: StoreType | undefined,
): ReturnType<typeof useFaqStore> | ReturnType<typeof useBlogStore> | null

export function useCurrentStore(
  storeType: StoreType | undefined,
): ReturnType<typeof useFaqStore> | ReturnType<typeof useBlogStore> | null {
  switch (storeType) {
    case "faqStore":
      return useFaqStore()
    case "blogStore":
      return useBlogStore()
    default:
      return null
  }
}
