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
  catalog_item_id: z.number(), // 1:M
  img_path: z.string().min(1, { message: "must present" }),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  link: z.string().min(1).max(200),
  src_platform: z.enum(["telegram", "web", "signal", "other"]), // SrcPlatform;

  frontendFile: z.instanceof(File).optional(),
});

export type CatalogLink = z.infer<typeof catalogLinkSchema>;
/////////////
export const reitingSchema = z.object({
  id: z.number().optional(),
  catalog_item_id: z.number().nullable().optional(),
  value: z.number().min(0).max(100),
  created_at: z.string().optional(),
});
export type Reiting = z.infer<typeof reitingSchema>;
////

export const catalogItemSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  tags: z.string(),

  // img_short_path: z.string().min(1, { message: "must present" }),
  // img_large_path: z.string().min(1, { message: "must present" }),
  // description_short: z.string().min(1),
  // description_large: z.string().min(1),
  // rules: z.string().min(1),

  // brief_audience_meaning:z.string().min(1),
  // brief_audience_score:z.string().min(1),
  // brief_activennes_meaning:z.string().min(1),
  // brief_activennes_score:z.string().min(1),
  // brief_botting_meaning:z.string().min(1),
  // brief_botting_score:z.string().min(1),
  // brief_networking_meaning:z.string().min(1),
  // brief_networking_score:z.string().min(1),
  // brief_effectiveness_of_promotions_meaning:z.string().min(1),
  // brief_effectiveness_of_promotions_score:z.string().min(1),
  // brief_moderation_meaning:z.string().min(1),
  // brief_moderation_score:z.string().min(1),
  // brief_organicity_meaning:z.string().min(1),
  // brief_organicity_score:z.string().min(1),
  // brief_admins_meaning:z.string().min(1),
  // brief_admins_score:z.string().min(1),
});

export type CatalogItem = z.infer<typeof catalogItemSchema>;

export const fullCatalogItemSchema = catalogItemSchema.extend({
  // links: z.array(catalogLinkSchema),
  admins: z.array(catalogAdminSchema),
  rewards: z.array(rewardSchema),
  reitings: z.array(reitingSchema),

  // frontendFileShort: z.instanceof(File).optional(),
  // frontendFileLarge: z.instanceof(File).optional(),
});

export type FullCatalogItem = z.infer<typeof fullCatalogItemSchema>;
