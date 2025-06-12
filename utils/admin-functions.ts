import type { AdminTableMode, AdminTableModeLiteral, StoreType } from "~/types/admin"

export const getAdminModeValue = (modeLiteral: AdminTableModeLiteral): AdminTableModeLiteral => {
  const daminTableMode: AdminTableMode = adminTableModes.find((m) => m.value === modeLiteral) || adminTableModes[0]
  return daminTableMode.value
}

export const getItemLabel = (storeType: StoreType): string => {
  const defaultLabel = "F.A.Q."
  switch (storeType) {
    case "blogStore":
      return "Blog"
    case "faqStore":
      return "F.A.Q."
    case "catalogAdminsStore":
      return "Catalog-Admin"
    case "catalogRewardsStore":
      return "Catalog-Reward"
    default:
      return defaultLabel
  }
}
