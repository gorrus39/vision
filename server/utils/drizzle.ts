import { drizzle } from "drizzle-orm/d1"
import * as schema from "../database/schema"
import { blogItems } from "../database/schema"
import { BlogItem } from "~/types/blog"
import { asc, desc, eq, inArray } from "drizzle-orm"
import {
  Bunner,
  CatalogAdmin,
  CatalogAdminsToItems,
  CatalogItem,
  CatalogLink,
  CatalogRewardsToItems,
  Reward,
} from "~/types/catalog"
import { SlugAsset } from "~/types/common"
import { faqImage, FaqImage, FullFaqItem } from "~/types/faq"

// export { sql, eq, and, or } from "drizzle-orm";

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export function queries() {
  const db = useDrizzle()

  return {
    blogQueries: {
      async getAll() {
        return await db.select().from(blogItems).orderBy(blogItems.order_index)
      },

      async getById(id: number) {
        return await db.select().from(blogItems).where(eq(blogItems.id, id)).limit(1)
      },

      async create(data: BlogItem) {
        const image_paths = JSON.stringify(data.image_paths)

        const { id, ...dataWithoutId } = data // Удаляем id
        return await db
          .insert(blogItems)
          .values({ ...dataWithoutId, image_paths })
          .returning()
      },

      async update(id: number, data: BlogItem) {
        const image_paths = JSON.stringify(data.image_paths)
        return await db
          .update(blogItems)
          .set({ ...data, image_paths })
          .where(eq(blogItems.id, id))
          .returning()
      },

      async delete(id: number) {
        return await db.delete(blogItems).where(eq(blogItems.id, id)).returning()
      },
    },
    catalogRewards: {
      async getAll() {
        return await db.select().from(schema.rewards)
      },

      async getById(id: number) {
        return await db.select().from(schema.rewards).where(eq(schema.rewards.id, id)).limit(1)
      },

      async create(data: Reward) {
        return await db.insert(schema.rewards).values(data).returning()
      },

      async update(id: number, data: Reward) {
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
    //////////
    // reitings: {
    //   async getAll() {
    //     return await db.select().from(schema.reitings).orderBy(desc(schema.reitings.created_at))
    //   },
    //   async create(data: Reiting) {
    //     return await db.insert(schema.reitings).values(data).returning()
    //   },
    // },
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
        return await db.select().from(schema.slugAssets).where(eq(schema.slugAssets.slug, slug)).limit(1)
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
      async getAllWithImages() {
        return await db.query.faqItems.findMany({ with: { images: true }, orderBy: [asc(schema.faqItems.order_index)] })
      },
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
      async getByIdWithImages(id: number) {
        return await db.query.faqItems.findFirst({
          with: { images: true },
          where: (faqItems, { eq }) => eq(faqItems.id, id),
        })
      },
      // async createWithImages(data: FullFaqItem): Promise<{ success: boolean }> {
      //   return await db.transaction(async (tx) => {
      //     const { images, ...faqWithoutImages } = data
      //     const [db_item] = await db.insert(schema.faqItems).values(faqWithoutImages).returning()

      //     if (!db_item) tx.rollback()

      //     const { everyFaqImagesSuccess } = await createFaqImages(images, db_item.id)

      //     if (!everyFaqImagesSuccess) tx.rollback()

      //     return { success: true }
      //   })
      // },
    },
    faqImage: {
      async create(data: FaqImage, faq_item_id: number) {
        return await db
          .insert(schema.faqImages)
          .values({ ...data, faq_item_id })
          .returning()
      },

      async update(id: number, data: FaqImage) {
        return await db.update(schema.faqImages).set(data).where(eq(schema.faqImages.id, id)).returning()
      },
      async delete(id: number) {
        return await db.delete(schema.faqImages).where(eq(schema.faqImages.id, id)).returning()
      },
    },
  }
}
