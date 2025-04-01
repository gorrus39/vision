import { z } from "zod";

type CatalogItem = {
  id: number;
  title: string;
  logo: string;
  description_short: string;
  description_large: string;
  rules: string; // html
};

// заголовок - 3 поля
// "telegram" | "web" | "signal" | "other";
type SrcPlatform = {
  id: number;
  name: string;
};

type CatalogItemLink = {
  id: number;
  catalog_item_id: number; // 1:M
  src_platform: SrcPlatform;
  title: string;
  description: string;
  href: string;
};

type Reiting = {
  // ?
};

// export type Reward = {
//   id: number;
//   img_path: string;
//   name: string;
//   description: string;
// };

export const rewardSchema = z.object({
  id: z.number().optional(),
  img_path: z.string().min(1, { message: "must present" }),
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(200),

  frontendFile: z.instanceof(File).optional(),
});

export type Reward = z.infer<typeof rewardSchema>;
// 'audience' | 'activennes' | 'botting' | 'networking' |
// 'effectiveness of promotions' | 'moderation' |
// 'organicity' | 'admins'
type Brief = {
  id: number;
  catalog_item_id: number; // уникальное 1:1
  category: string;
  meaning: string;
  score: string;
};

type CatalogItemAdmin = {
  id: number;
  catalog_item_id: number; // 1:M
  avatar: string;
  name: string;
  description: string;
  href: string;
};
