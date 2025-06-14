import type { AdminTableMode } from "~/types/admin"
import type { ImageReferType } from "~/types/common"

////////////////
export const BASE = "base" // as const;
export const DRAG = "drag" // as const;

export const A_MODES = {
  BASE,
  DRAG,
} as const

export const adminTableModes: AdminTableMode[] = [
  { label: "base mode", value: A_MODES.BASE },
  { label: "drag mode", value: A_MODES.DRAG },
]

////////////////
