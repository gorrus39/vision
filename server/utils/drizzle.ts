import { drizzle } from "drizzle-orm/d1"
import * as schema from "../database/schema"
import { blogItems } from "../database/schema"
import { BlogItem } from "~/types/blog"
import { and, asc, desc, eq, inArray } from "drizzle-orm"
import {
  Bunner,
  CatalogAdmin,
  CatalogAdminsToItems,
  CatalogItem,
  CatalogLink,
  CatalogRewardsToItems,
  CatalogReward,
} from "~/types/catalog"
import { Image, ImageReferType, SlugAsset } from "~/types/common"
import { FullFaqItem } from "~/types/faq"

// export { sql, eq, and, or } from "drizzle-orm";

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export function queries() {
  const db = useDrizzle()

  return {
    // blogQueries: {
    //   async getAll() {
    //     return await db.select().from(blogItems).orderBy(blogItems.order_index)
    //   },

    //   async getById(id: number) {
    //     return await db.select().from(blogItems).where(eq(blogItems.id, id)).limit(1)
    //   },

    //   async create(data: BlogItem) {
    //     const image_paths = JSON.stringify(data.image_paths)

    //     const { id, ...dataWithoutId } = data // Удаляем id
    //     return await db
    //       .insert(blogItems)
    //       .values({ ...dataWithoutId, image_paths })
    //       .returning()
    //   },

    //   async update(id: number, data: BlogItem) {
    //     const image_paths = JSON.stringify(data.image_paths)
    //     return await db
    //       .update(blogItems)
    //       .set({ ...data, image_paths })
    //       .where(eq(blogItems.id, id))
    //       .returning()
    //   },

    //   async delete(id: number) {
    //     return await db.delete(blogItems).where(eq(blogItems.id, id)).returning()
    //   },
    // },
    catalogRewards: {
      async getAll() {
        return await db.select().from(schema.rewards)
      },

      async getById(id: number) {
        return await db.select().from(schema.rewards).where(eq(schema.rewards.id, id)).limit(1)
      },

      async create(data: CatalogReward) {
        return await db.insert(schema.rewards).values(data).returning()
      },

      async update(id: number, data: CatalogReward) {
        return await db.update(schema.rewards).set(data).where(eq(schema.rewards.id, id)).returning()
      },

      async delete(id: number) {
        return await db.delete(schema.rewards).where(eq(schema.rewards.id, id)).returning()
      },
    },
    catalogRewardsToItems: {
      async getAll() {
        return await db.select().from(schema.catalogRewardsToItems)
      },
      // async getById(id: number) {
      //   return await db.select().from(schema.catalogAdmins).where(eq(schema.catalogAdmins.id, id)).limit(1);
      // },
      async getAllByCatalogItemId(catalogItemId: number) {
        return await db
          .select()
          .from(schema.catalogRewardsToItems)
          .where(eq(schema.catalogRewardsToItems.catalog_item_id, catalogItemId))
      },
      async create(data: CatalogRewardsToItems) {
        return await db.insert(schema.catalogRewardsToItems).values(data).returning()
      },
      // async update(id: number, data: CatalogAdmin) {
      //   return await db.update(schema.catalogAdmins).set(data).where(eq(schema.catalogAdmins.id, id)).returning();
      // },
      async delete(id: number) {
        return await db.delete(schema.catalogRewardsToItems).where(eq(schema.catalogRewardsToItems.id, id)).returning()
      },
    },
    catalogAdmin: {
      async getAll() {
        return await db.select().from(schema.catalogAdmins)
      },

      async getById(id: number) {
        return await db.select().from(schema.catalogAdmins).where(eq(schema.catalogAdmins.id, id)).limit(1)
      },

      async create(data: CatalogAdmin) {
        return await db.insert(schema.catalogAdmins).values(data).returning()
      },

      async update(id: number, data: CatalogAdmin) {
        return await db.update(schema.catalogAdmins).set(data).where(eq(schema.catalogAdmins.id, id)).returning()
      },

      async delete(id: number) {
        return await db.delete(schema.catalogAdmins).where(eq(schema.catalogAdmins.id, id)).returning()
      },
    },
    catalogItem: {
      async getAll() {
        return await db.select().from(schema.catalogItems)
      },

      async getById(id: number) {
        return await db.select().from(schema.catalogItems).where(eq(schema.catalogItems.id, id)).limit(1)
      },

      async create(data: CatalogItem) {
        return await db.insert(schema.catalogItems).values(data).returning()
      },

      async update(id: number, data: CatalogItem) {
        return await db.update(schema.catalogItems).set(data).where(eq(schema.catalogItems.id, id)).returning()
      },

      async delete(id: number) {
        return await db.delete(schema.catalogItems).where(eq(schema.catalogItems.id, id)).returning()
      },
    },
    catalogAdminsToItems: {
      async getAll() {
        return await db.select().from(schema.catalogAdminsToItems)
      },
      async getAllByCatalogItemId(catalogItemId: number) {
        return await db
          .select()
          .from(schema.catalogAdminsToItems)
          .where(eq(schema.catalogAdminsToItems.catalog_item_id, catalogItemId))
      },
      async create(data: CatalogAdminsToItems) {
        return await db.insert(schema.catalogAdminsToItems).values(data).returning()
      },
      async delete(id: number) {
        return await db.delete(schema.catalogAdminsToItems).where(eq(schema.catalogAdminsToItems.id, id)).returning()
      },
    },
    catalogLinks: {
      async getAll() {
        return await db.select().from(schema.catalogLinks)
      },

      async getAllByCatalogItemId(catalog_item_id: number) {
        return await db
          .select()
          .from(schema.catalogLinks)
          .where(eq(schema.catalogLinks.catalog_item_id, catalog_item_id))
      },
      async create(data: CatalogLink) {
        return await db.insert(schema.catalogLinks).values(data).returning()
      },
      async update(id: number, data: CatalogLink) {
        return await db.update(schema.catalogLinks).set(data).where(eq(schema.catalogLinks.id, id)).returning()
      },

      async delete(id: number) {
        return await db.delete(schema.catalogLinks).where(eq(schema.catalogLinks.id, id)).returning()
      },
    },

    catalogBunners: {
      async getAll() {
        return await db.select().from(schema.catalogBunners)
      },
      async getById(id: number) {
        return await db.select().from(schema.catalogBunners).where(eq(schema.catalogBunners.id, id)).limit(1)
      },
      async create(data: Bunner) {
        return await db.insert(schema.catalogBunners).values(data).returning()
      },
      async update(id: number, data: Bunner) {
        return await db.update(schema.catalogBunners).set(data).where(eq(schema.catalogBunners.id, id)).returning()
      },
      async delete(id: number) {
        return await db.delete(schema.catalogBunners).where(eq(schema.catalogBunners.id, id)).returning()
      },
    },

    slugAssets: {
      async getAll() {
        return await db.select().from(schema.slugAssets)
      },
      async getBySlug(slug: string) {
        return await db.select().from(schema.slugAssets).where(eq(schema.slugAssets.slug, slug))
      },
      async getById(id: number) {
        return await db.select().from(schema.slugAssets).where(eq(schema.slugAssets.id, id)).limit(1)
      },
      async create(data: SlugAsset) {
        return await db.insert(schema.slugAssets).values(data).returning()
      },
      async update(id: number, data: SlugAsset) {
        return await db.update(schema.slugAssets).set(data).where(eq(schema.slugAssets.id, id)).returning()
      },
      async delete(id: number) {
        return await db.delete(schema.slugAssets).where(eq(schema.slugAssets.id, id)).returning()
      },
    },

    faqItems: {
      async getAll() {
        return await db.select().from(schema.faqItems).orderBy(schema.faqItems.order_index)
      },
      async getAllByIds(ids: number[]) {
        return await db.select().from(schema.faqItems).where(inArray(schema.faqItems.id, ids))
      },
      async create(data: FullFaqItem) {
        const { images, ...withoutImages } = data
        return await db.insert(schema.faqItems).values(withoutImages).returning()
      },
      async update(id: number, data: FullFaqItem | Partial<FullFaqItem>) {
        const { images, ...withoutImages } = data
        return await db.update(schema.faqItems).set(withoutImages).where(eq(schema.faqItems.id, id)).returning()
      },
      async delete(id: number) {
        return await db.delete(schema.faqItems).where(eq(schema.faqItems.id, id)).returning()
      },
      async getById(id: number) {
        return await db.select().from(schema.faqItems).where(eq(schema.faqItems.id, id)).limit(1)
      },
    },
    blogItems: {
      async getAll() {
        return await db.select().from(schema.blogItems).orderBy(schema.blogItems.order_index)
      },
      async getAllByIds(ids: number[]) {
        return await db.select().from(schema.blogItems).where(inArray(schema.blogItems.id, ids))
      },
      async create(data: BlogItem) {
        const { images, ...withoutImages } = data
        return await db.insert(schema.blogItems).values(withoutImages).returning()
      },
      async update(id: number, data: BlogItem | Partial<BlogItem>) {
        const { images, ...withoutImages } = data
        return await db.update(schema.blogItems).set(withoutImages).where(eq(schema.blogItems.id, id)).returning()
      },
      async delete(id: number) {
        return await db.delete(schema.blogItems).where(eq(schema.blogItems.id, id)).returning()
      },
      async getById(id: number) {
        return await db.select().from(schema.blogItems).where(eq(schema.blogItems.id, id)).limit(1)
      },
    },
    images: {
      async getByIds({ refer_ids, refer_type }: { refer_ids: number[]; refer_type: ImageReferType }) {
        return await db
          .select()
          .from(schema.images)
          .where(and(inArray(schema.images.refer_id, refer_ids), eq(schema.images.refer_type, refer_type)))
      },
      async getById({ refer_id, refer_type }: { refer_id: number; refer_type: ImageReferType }) {
        return await db
          .select()
          .from(schema.images)
          .where(and(eq(schema.images.refer_id, refer_id), eq(schema.images.refer_type, refer_type)))
      },
      async create(data: Image, refer_id: number, refer_type: ImageReferType) {
        return await db
          .insert(schema.images)
          .values({ ...data, refer_id, refer_type })
          .returning()
      },

      async update(id: number, data: Image) {
        return await db.update(schema.images).set(data).where(eq(schema.images.id, id)).returning()
      },
      async delete(id: number) {
        return await db.delete(schema.images).where(eq(schema.images.id, id)).returning()
      },
    },
  }
}
