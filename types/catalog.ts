import { z } from "zod"
import { getBriefAgrigationValue } from "~/utils/all"

export const randNumberCopy = ({ start, end }: { start: number; end: number }): number => {
  const amount = end - start
  if (amount <= 0) return 0

  const arr = Array(amount)
    .fill(0)
    .map((_el, index) => start + index)

  const element = randElementCopy(arr)
  // console.log(element)
  return element
}
const randElementCopy = <T>(arr: T[]): T => {
  const length = arr.length
  const index = Math.floor(Math.random() * length)
  if (index >= arr.length) console.error("randElement()", "arr.length", arr.length, "index", index)
  return arr[index]
}
/////////////////////////////////////////////////////////////////////////////
export const rewardSchema = z.object({
  id: z.number().optional(),
  img_path: z.string().min(1, { message: "must present" }),
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(1000),

  frontendFile: z.instanceof(File).optional(),
})

export type Reward = z.infer<typeof rewardSchema>

export const catalogRewardsToItemsSchema = z.object({
  id: z.number().optional(),
  catalog_reward_id: z.number(),
  catalog_item_id: z.number(),
})

export type CatalogRewardsToItems = z.infer<typeof catalogRewardsToItemsSchema>
/////////////////////////////////////////////////////////////////////////////

export const catalogAdminSchema = z.object({
  id: z.number().optional(),
  avatar_path: z.string().min(1, { message: "must present" }),
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(1000),
  link: z.string().min(1).max(200),

  frontendFile: z.instanceof(File).optional(),
})
export type CatalogAdmin = z.infer<typeof catalogAdminSchema>
/////////////////////////////////////////////////////////////////////////////

export const catalogAdminsToItemsSchema = z.object({
  id: z.number().optional(),
  catalog_admin_id: z.number(),
  catalog_item_id: z.number(),
})
export type CatalogAdminsToItems = z.infer<typeof catalogAdminsToItemsSchema>
/////////////////////////////////////////////////////////////////////////////
export const tagsSchema = z.enum([
  "kozmap",
  "oracle",
  //
  "english",
  "russian",
  "chinese",
  "spanish",
  "french",
  //
  "chat",
  "markets",
  "forums",
  "top sellers",
  "essentials",
  "others",
])
export type Tag = z.infer<typeof tagsSchema>
/////////////////////////////////////////////////////////////////////////////

export const catalogLinkSchema = z.object({
  id: z.number().optional(),
  catalog_item_id: z.number().nullable(), // 1:M
  // img_path: z.string().min(1, { message: "must present" }),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  link: z.string().min(1).max(200),
  src_platform: z.string().min(1, { message: "must present" }), // SrcPlatform;

  // frontendFile: z.instanceof(File).optional(),
})

export type CatalogLink = z.infer<typeof catalogLinkSchema>
// export const reitingSchema = z.object({
//   id: z.number().optional(),
//   catalog_item_id: z.number().nullable().optional(),
//   value: z.number().min(0).max(100),
//   created_at: z.string().optional(),
// })
// export type Reiting = z.infer<typeof reitingSchema>
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

export const catalogItemSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  tags: z.string(),

  img_short_path: z.string().min(1, { message: "must present" }).nullable(),
  img_large_path: z.string().min(1, { message: "must present" }).nullable(),
  description_short: z.string().min(1),
  description_large: z.string().min(8, { message: "must present" }),
  rules: z.string().min(8, { message: "must present" }),

  brief: z.string(),

  is_top: z.boolean(),

  // is_top_ru: z.boolean().nullable(),
  // is_top_en: z.boolean().nullable(),
  // is_top_cn: z.boolean().nullable(),
})

export type CatalogItem = z.infer<typeof catalogItemSchema>

export const fullCatalogItemSchema = catalogItemSchema.extend({
  links: z.array(catalogLinkSchema),
  admins: z.array(catalogAdminSchema),
  rewards: z.array(rewardSchema),
  // reitings: z.array(reitingSchema),

  frontendFileShort: z.instanceof(File).optional(),
  frontendFileLarge: z.instanceof(File).optional(),
})

export type FullCatalogItem = z.infer<typeof fullCatalogItemSchema>

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
type BriefCategory =
  | "audience"
  | "activeness"
  | "botting"
  | "networking"
  | "effective_of_promotions"
  | "moderation"
  | "organicity"
  | "admins"
  | "knowledge_sharing"
  | "additions"

export type BriefItemJson = {
  category: BriefCategory
  meaning: {
    ru: string | undefined
    en: string | undefined
    cn: string | undefined
  }
  score: number // | undefined
}
export type Lang = "ru" | "en" | "cn"

const briefCategories: BriefCategory[] = [
  "audience",
  "activeness",
  "botting",
  "networking",
  "effective_of_promotions",
  "moderation",
  "organicity",
  "admins",
  "knowledge_sharing",
  "additions",
]

const fillValueSeed = "valid test value"
const fillValue = undefined // real value, when new item

export const briefJsonEmpty: BriefItemJson[] = briefCategories.map((c) => ({
  category: c,
  meaning: {
    ru: fillValue,
    en: fillValue,
    cn: fillValue,
  },
  score: 5,
  // score: randNumberCopy({ start: 0, end: 10 }),
}))

export type FullBriefJson = {
  items: BriefItemJson[]
  lastAgrigation: { itemsAmount: number; sumValue: number | null }
}

export const fullBriefJsonSeed = (): FullBriefJson => {
  const items: BriefItemJson[] = briefCategories.map((c) => ({
    category: c,
    meaning: {
      ru: fillValueSeed,
      en: fillValueSeed,
      cn: fillValueSeed,
    },
    score: randNumberCopy({ start: 0, end: 10 }),
  }))
  // console.log("nesxt")
  return {
    items,
    lastAgrigation: getBriefAgrigationValue({ items, type: "seed" }),
  }
}

export const fullBriefJsonEmpty = (): FullBriefJson => ({
  items: briefJsonEmpty,
  lastAgrigation: getBriefAgrigationValue({ items: briefJsonEmpty, type: "initial" }),
})

// export const emptyBriefString = JSON.stringify(fullBriefJson)

// export const emptyBriefSeedString = JSON.stringify({
//   items: emptyBriefItemSeed,
//   lastAgrigation: getBriefAgrigationValue({ items: emptyBriefItemSeed, type: "seed" }),
// })
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
export const bunnerSchema = z.object({
  id: z.number().optional(),
  img_path: z.string().min(1, { message: "must present" }),
  frontendFile: z.instanceof(File).optional(),
})

export type Bunner = z.infer<typeof bunnerSchema>
