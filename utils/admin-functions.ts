import type { AdminTableMode, AdminTableModeLiteral } from "~/types/admin"

export const getAdminModeValue = (modeLiteral: AdminTableModeLiteral): AdminTableModeLiteral => {
  const daminTableMode: AdminTableMode = adminTableModes.find((m) => m.value === modeLiteral) || adminTableModes[0]
  return daminTableMode.value
}
