import _ from "lodash";
import { z } from "zod";

/////////////////////////////////////////////////////////////////////////////
export const rewardSchema = z.object({
  id: z.number().optional(),
  img_path: z.string().min(1, { message: "must present" }),
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(1000),

  frontendFile: z.instanceof(File).optional(),
});

export type Reward = z.infer<typeof rewardSchema>;

export const catalogRewardsToItemsSchema = z.object({
  id: z.number().optional(),
  catalog_reward_id: z.number(),
  catalog_item_id: z.number(),
});

export type CatalogRewardsToItems = z.infer<typeof catalogRewardsToItemsSchema>;
/////////////////////////////////////////////////////////////////////////////

export const catalogAdminSchema = z.object({
  id: z.number().optional(),
  avatar_path: z.string().min(1, { message: "must present" }),
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(1000),
  link: z.string().min(1).max(200),

  frontendFile: z.instanceof(File).optional(),
});
export type CatalogAdmin = z.infer<typeof catalogAdminSchema>;
/////////////////////////////////////////////////////////////////////////////

export const catalogAdminsToItemsSchema = z.object({
  id: z.number().optional(),
  catalog_admin_id: z.number(),
  catalog_item_id: z.number(),
});
export type CatalogAdminsToItems = z.infer<typeof catalogAdminsToItemsSchema>;
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
]);
export type Tag = z.infer<typeof tagsSchema>;
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
});

export type CatalogLink = z.infer<typeof catalogLinkSchema>;
export const reitingSchema = z.object({
  id: z.number().optional(),
  catalog_item_id: z.number().nullable().optional(),
  value: z.number().min(0).max(100),
  created_at: z.string().optional(),
});
export type Reiting = z.infer<typeof reitingSchema>;
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

export const catalogItemSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  tags: z.string(),

  // img_short_path: z.string().min(1, { message: "must present" }),
  // img_large_path: z.string().min(1, { message: "must present" }),
  description_short: z.string().min(1),
  description_large: z.string().min(1),
  rules: z.string().min(1),

  brief: z.string(),
});

export type CatalogItem = z.infer<typeof catalogItemSchema>;

export const fullCatalogItemSchema = catalogItemSchema.extend({
  links: z.array(catalogLinkSchema),
  admins: z.array(catalogAdminSchema),
  rewards: z.array(rewardSchema),
  reitings: z.array(reitingSchema),

  // frontendFileShort: z.instanceof(File).optional(),
  // frontendFileLarge: z.instanceof(File).optional(),
});

export type FullCatalogItem = z.infer<typeof fullCatalogItemSchema>;

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
type Category =
  | "audience"
  | "activennes"
  | "botting"
  | "networking"
  | "effectiveness_of_promotions"
  | "moderation"
  | "organicity"
  | "admins";
export type BriefItemJson = { category: Category; meaning: string | undefined; score: string | undefined };
// type Lang = "ru" | "en" | "cn";

const categories: Category[] = [
  "audience",
  "activennes",
  "botting",
  "networking",
  "effectiveness_of_promotions",
  "moderation",
  "organicity",
  "admins",
];

const fillValue = "valid test value";
// const fillValue = "undefined"; // real value

export const emptyBriefItem: BriefItemJson[] = categories.map((c) => ({
  category: c,
  meaning: fillValue,
  score: fillValue,
}));

// [
//   { category: "audience", meaning: "undefined", score: "undefined" },
//   { category: "activennes", meaning: "undefined", score: "undefined" },
//   { category: "botting", meaning: "undefined", score: "undefined" },
//   { category: "networking", meaning: "undefined", score: "undefined" },
//   { category: "effectiveness_of_promotions", meaning: "undefined", score: "undefined" },
//   { category: "moderation", meaning: "undefined", score: "undefined" },
//   { category: "organicity", meaning: "undefined", score: "undefined" },
//   { category: "admins", meaning: "undefined", score: "undefined" },
// ];

export const emptyBriefString = JSON.stringify({
  en: emptyBriefItem,
  ru: emptyBriefItem,
  cn: emptyBriefItem,
});
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
