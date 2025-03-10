import { drizzle } from "drizzle-orm/d1";
export { sql, eq, and, or } from "drizzle-orm";

import * as schema from "../database/schema";

export const tables = schema;

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema });
}

// Типизация записи
export type BlogItem = typeof schema.blogItems.$inferInsert;

// Функция для добавления записи в таблицу
// export async function addBlogItem(
//   db: ReturnType<typeof useDrizzle>,
//   data: BlogItem,
// ) {
//   await db.insert(schema.blogItems).values(data);
// }
