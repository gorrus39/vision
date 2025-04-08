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

// export const catalogItemSchema = z.object({
//   id: z.number().optional(),
//   name: z.string().min(1).max(40),
// });
// export type CatalogItem = z.infer<typeof catalogItemSchema>;
/////////////////////////////////////////////////////////////////////////////
export const catalogAdminsToItemsSchema = z.object({
  id: z.number().optional(),
  catalog_admin_id: z.number(),
  catalog_item_id: z.number(),
});
export type CatalogAdminsToItems = z.infer<typeof catalogAdminsToItemsSchema>;
/////////////////////////////////////////////////////////////////////////////
export const tagsLine1Schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(20),
});
export type TagsLine1 = z.infer<typeof tagsLine1Schema>;

export const tagsLine2Schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(20),
});
export type TagsLine2 = z.infer<typeof tagsLine2Schema>;
export const tagsLine3Schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(20),
});
export type TagsLine3 = z.infer<typeof tagsLine3Schema>;
///
export const catalogTagsLine1ToItemsSchema = z.object({
  id: z.number().optional(),
  catalog_tags_line_1_id: z.number(),
  catalog_item_id: z.number(),
});
export type CatalogTagsLine1ToItems = z.infer<typeof catalogTagsLine1ToItemsSchema>;
///
export const catalogTagsLine2ToItemsSchema = z.object({
  id: z.number().optional(),
  catalog_tags_line_2_id: z.number(),
  catalog_item_id: z.number(),
});
export type CatalogTagsLine2ToItems = z.infer<typeof catalogTagsLine2ToItemsSchema>;
///
export const catalogTagsLine3ToItemsSchema = z.object({
  id: z.number().optional(),
  catalog_tags_line_3_id: z.number(),
  catalog_item_id: z.number(),
});
export type CatalogTagsLine3ToItems = z.infer<typeof catalogTagsLine3ToItemsSchema>;
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
  catalog_item_id: z.number(),
  value: z.number().min(0).max(100),
  created_at: z.string().optional(),
});
export type Reiting = z.infer<typeof reitingSchema>;
////

export const catalogItemSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),

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
  // tags_line1: z.array(catalogTagsLine1ToItemsSchema),
  // tags_line2: z.array(catalogTagsLine2ToItemsSchema),
  // tags_line3: z.array(catalogTagsLine3ToItemsSchema),

  // links: z.array(catalogLinkSchema),
  admins: z.array(catalogAdminSchema),
  rewards: z.array(rewardSchema),
  // reiting: z.array(reitingSchema),

  // frontendFileShort: z.instanceof(File).optional(),
  // frontendFileLarge: z.instanceof(File).optional(),
});

export type FullCatalogItem = z.infer<typeof fullCatalogItemSchema>;
