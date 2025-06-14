import { z } from "zod"
import { getBriefAgrigationValue } from "~/utils/all"
import { imageSchema } from "./common"

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
export const catalogRewardSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(1000),

  images: z.array(imageSchema),
})

export type CatalogReward = z.infer<typeof catalogRewardSchema>

export const catalogRewardsToItemsSchema = z.object({
  id: z.number().optional(),
  catalog_reward_id: z.number(),
  catalog_item_id: z.number(),
})

export type CatalogRewardsToItems = z.infer<typeof catalogRewardsToItemsSchema>
/////////////////////////////////////////////////////////////////////////////

export const catalogAdminSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(1000),
  link: z.string().min(1).max(200),

  images: z.array(imageSchema),
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

///////////////////////////////////////

const briefCategorySchema = z.enum([
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
])
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
const briefRowSchema = z.object({
  category: briefCategorySchema,
  meaning: z.object({
    ru: z.string().optional(),
    en: z.string().optional(),
    cn: z.string().optional(),
  }),
  score: z.number(),
})

const briefJsonSchema = z.object({
  items: z.array(briefRowSchema),
  lastAgrigation: z.object({
    itemsAmount: z.number(),
    sumValue: z.number().nullable(),
  }),
})

export const catalogItemSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  tags: z.array(z.string()),

  description_short: z.string().min(1),
  description_large: z.string().min(1, { message: "must present" }),
  rules: z.string().min(8, { message: "must present" }),

  brief: briefJsonSchema,

  is_top: z.boolean(),
})

export type CatalogItem = z.infer<typeof catalogItemSchema>

export const fullCatalogItemSchema = catalogItemSchema
  .extend({
    links: z.array(catalogLinkSchema),
    catalog_admin_ids: z.array(z.number()),
    catalog_reward_ids: z.array(z.number()),

    images: z.array(imageSchema),
  })
  .refine(
    (val) => {
      const validate = (values: (string | undefined)[]) => values.every((val) => val && val.length > 0)

      const ruValues = val.brief.items.map((item) => item.meaning.ru)
      const enValues = val.brief.items.map((item) => item.meaning.en)
      const cnValues = val.brief.items.map((item) => item.meaning.cn)

      return validate(ruValues) || validate(enValues) || validate(cnValues)
    },
    { message: "must filled any language", path: ["brief"] },
  )

export type BriefCategory = z.infer<typeof briefCategorySchema>
export type BriefRow = z.infer<typeof briefRowSchema>
export type BriefJson = z.infer<typeof briefJsonSchema>

export type FullCatalogItem = z.infer<typeof fullCatalogItemSchema>

///////////////////////////////////////

export type Lang = "ru" | "en" | "cn"

const fillValueSeed = "valid test value"
const fillValue = undefined // real value, when new item

export const briefJsonEmpty: BriefRow[] = briefCategories.map((c) => ({
  category: c,
  meaning: {
    ru: fillValue,
    en: fillValue,
    cn: fillValue,
  },
  score: 5,
  // score: randNumberCopy({ start: 0, end: 10 }),
}))

export const fullBriefJsonSeed = (): BriefJson => {
  const items: BriefRow[] = briefCategories.map((c) => ({
    category: c,
    meaning: {
      ru: fillValueSeed,
      en: fillValueSeed,
      cn: fillValueSeed,
    },
    score: randNumberCopy({ start: 0, end: 10 }),
  }))

  return {
    items,
    lastAgrigation: getBriefAgrigationValue({ items, type: "seed" }),
  }
}

export const fullBriefJsonEmpty = (): BriefJson => ({
  items: briefJsonEmpty,
  lastAgrigation: getBriefAgrigationValue({ items: briefJsonEmpty, type: "initial" }),
})

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
export const bunnerSchema = z.object({
  id: z.number().optional(),
  img_path: z.string().min(1, { message: "must present" }),
  frontendFile: z.instanceof(File).optional(),
})

export type Bunner = z.infer<typeof bunnerSchema>
