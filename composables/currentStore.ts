import type { StoreType } from "~/types/admin"

export function useCurrentStore(storeType: undefined): null
export function useCurrentStore(storeType: "faqStore"): ReturnType<typeof useFaqStore>
export function useCurrentStore(storeType: "blogStore"): ReturnType<typeof useBlogStore>
export function useCurrentStore(storeType: "catalogAdminsStore"): ReturnType<typeof useCatalogAdminsStore>
export function useCurrentStore(storeType: "catalogRewardsStore"): ReturnType<typeof useCatalogRewardsStore>

export function useCurrentStore(
  storeType: StoreType | undefined,
):
  | ReturnType<typeof useFaqStore>
  | ReturnType<typeof useBlogStore>
  | ReturnType<typeof useCatalogAdminsStore>
  | ReturnType<typeof useCatalogRewardsStore>
  | null

export function useCurrentStore(
  storeType: StoreType | undefined,
):
  | ReturnType<typeof useFaqStore>
  | ReturnType<typeof useBlogStore>
  | ReturnType<typeof useCatalogAdminsStore>
  | ReturnType<typeof useCatalogRewardsStore>
  | null {
  switch (storeType) {
    case "faqStore":
      return useFaqStore()
    case "blogStore":
      return useBlogStore()
    case "catalogAdminsStore":
      return useCatalogAdminsStore()
    case "catalogRewardsStore":
      return useCatalogRewardsStore()
    default:
      return null
  }
}
