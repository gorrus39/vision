import { drizzle } from "drizzle-orm/d1";
import * as schema from "../database/schema";
import { blogItems } from "../database/schema";
import { BlogItem } from "~/types/blog";
import { eq } from "drizzle-orm";
import {
  CatalogAdmin,
  CatalogAdminsToItems,
  CatalogItem,
  CatalogLink,
  CatalogRewardsToItems,
  CatalogTagsLine1ToItems,
  CatalogTagsLine2ToItems,
  CatalogTagsLine3ToItems,
  Reiting,
  Reward,
  TagsLine1,
  TagsLine2,
  TagsLine3,
} from "~/types/catalog";

// export { sql, eq, and, or } from "drizzle-orm";

export const tables = schema;

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema });
}

export function queries() {
  const db = useDrizzle();
  return {
    blogQueries: {
      async getAll() {
        return await db.select().from(blogItems).orderBy(blogItems.order_index);
      },

      async getById(id: number) {
        return await db.select().from(blogItems).where(eq(blogItems.id, id)).limit(1);
      },

      async create(data: BlogItem) {
        const image_paths = JSON.stringify(data.image_paths);

        const { id, ...dataWithoutId } = data; // Удаляем id
        return await db
          .insert(blogItems)
          .values({ ...dataWithoutId, image_paths })
          .returning();
      },

      async update(id: number, data: BlogItem) {
        const image_paths = JSON.stringify(data.image_paths);
        return await db
          .update(blogItems)
          .set({ ...data, image_paths })
          .where(eq(blogItems.id, id))
          .returning();
      },

      async delete(id: number) {
        return await db.delete(blogItems).where(eq(blogItems.id, id)).returning();
      },
    },
    catalogRewards: {
      async getAll() {
        return await db.select().from(schema.rewards);
      },

      async getById(id: number) {
        return await db.select().from(schema.rewards).where(eq(schema.rewards.id, id)).limit(1);
      },

      async create(data: Reward) {
        return await db.insert(schema.rewards).values(data).returning();
      },

      async update(id: number, data: Reward) {
        return await db.update(schema.rewards).set(data).where(eq(schema.rewards.id, id)).returning();
      },

      async delete(id: number) {
        return await db.delete(schema.rewards).where(eq(schema.rewards.id, id)).returning();
      },
    },
    catalogRewardsToItems: {
      async getAll() {
        return await db.select().from(schema.catalogRewardsToItems);
      },
      // async getById(id: number) {
      //   return await db.select().from(schema.catalogAdmins).where(eq(schema.catalogAdmins.id, id)).limit(1);
      // },
      async getAllByCatalogItemId(catalogItemId: number) {
        return await db
          .select()
          .from(schema.catalogRewardsToItems)
          .where(eq(schema.catalogRewardsToItems.catalog_item_id, catalogItemId));
      },
      async create(data: CatalogRewardsToItems) {
        return await db.insert(schema.catalogRewardsToItems).values(data).returning();
      },
      // async update(id: number, data: CatalogAdmin) {
      //   return await db.update(schema.catalogAdmins).set(data).where(eq(schema.catalogAdmins.id, id)).returning();
      // },
      async delete(id: number) {
        return await db.delete(schema.catalogRewardsToItems).where(eq(schema.catalogRewardsToItems.id, id)).returning();
      },
    },
    catalogAdmin: {
      async getAll() {
        return await db.select().from(schema.catalogAdmins);
      },

      async getById(id: number) {
        return await db.select().from(schema.catalogAdmins).where(eq(schema.catalogAdmins.id, id)).limit(1);
      },

      async create(data: CatalogAdmin) {
        return await db.insert(schema.catalogAdmins).values(data).returning();
      },

      async update(id: number, data: CatalogAdmin) {
        return await db.update(schema.catalogAdmins).set(data).where(eq(schema.catalogAdmins.id, id)).returning();
      },

      async delete(id: number) {
        return await db.delete(schema.catalogAdmins).where(eq(schema.catalogAdmins.id, id)).returning();
      },
    },
    catalogItem: {
      async getAll() {
        return await db.select().from(schema.catalogItems);
      },

      async getById(id: number) {
        return await db.select().from(schema.catalogItems).where(eq(schema.catalogItems.id, id)).limit(1);
      },

      async create(data: CatalogItem) {
        return await db.insert(schema.catalogItems).values(data).returning();
      },

      async update(id: number, data: CatalogItem) {
        return await db.update(schema.catalogItems).set(data).where(eq(schema.catalogItems.id, id)).returning();
      },

      async delete(id: number) {
        return await db.delete(schema.catalogItems).where(eq(schema.catalogItems.id, id)).returning();
      },
    },
    catalogAdminsToItems: {
      async getAll() {
        return await db.select().from(schema.catalogAdminsToItems);
      },
      async getAllByCatalogItemId(catalogItemId: number) {
        return await db
          .select()
          .from(schema.catalogAdminsToItems)
          .where(eq(schema.catalogAdminsToItems.catalog_item_id, catalogItemId));
      },
      async create(data: CatalogAdminsToItems) {
        return await db.insert(schema.catalogAdminsToItems).values(data).returning();
      },
      async delete(id: number) {
        return await db.delete(schema.catalogAdminsToItems).where(eq(schema.catalogAdminsToItems.id, id)).returning();
      },
    },

    //////////////
    catalogTagsLine1: {
      async create(data: TagsLine1) {
        return await db.insert(schema.catalogTagsLine1).values(data).returning();
      },
    },
    catalogTagsLine1ToItems: {
      async create(data: CatalogTagsLine1ToItems) {
        return await db.insert(schema.catalogTagsLine1ToItems).values(data).returning();
      },
    },
    ///
    catalogTagsLine2: {
      async create(data: TagsLine2) {
        return await db.insert(schema.catalogTagsLine2).values(data).returning();
      },
    },
    catalogTagsLine2ToItems: {
      async create(data: CatalogTagsLine2ToItems) {
        return await db.insert(schema.catalogTagsLine2ToItems).values(data).returning();
      },
    },
    ///
    catalogTagsLine3: {
      async create(data: TagsLine3) {
        return await db.insert(schema.catalogTagsLine3).values(data).returning();
      },
    },
    catalogTagsLine3ToItems: {
      async create(data: CatalogTagsLine3ToItems) {
        return await db.insert(schema.catalogTagsLine3ToItems).values(data).returning();
      },
    },
    //////////////
    catalogLinks: {
      async create(data: CatalogLink) {
        return await db.insert(schema.catalogLinks).values(data).returning();
      },
    },
    //////////
    reitings: {
      async create(data: Reiting) {
        return await db.insert(schema.reitings).values(data).returning();
      },
    },
  };
}
