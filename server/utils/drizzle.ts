import { drizzle } from "drizzle-orm/d1";
import * as schema from "../database/schema";
import { blogItems } from "../database/schema";
import { BlogItem } from "~/types/all";
import { eq } from "drizzle-orm";

// export { sql, eq, and, or } from "drizzle-orm";

function useDrizzle() {
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
        return await db
          .select()
          .from(blogItems)
          .where(eq(blogItems.id, id))
          .limit(1);
      },

      async create(data: BlogItem) {
        const { id, ...dataWithoutId } = data; // Удаляем id
        return await db.insert(blogItems).values(dataWithoutId).returning();
      },

      async update(id: number, data: BlogItem) {
        return await db
          .update(blogItems)
          .set(data)
          .where(eq(blogItems.id, id))
          .returning();
      },

      async delete(id: number) {
        return await db
          .delete(blogItems)
          .where(eq(blogItems.id, id))
          .returning();
      },
    },
  };
}
