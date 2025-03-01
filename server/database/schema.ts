import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lastName: text("last_name"),
  username: text("name"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const users2 = sqliteTable("users2", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  avatar: text("avatar").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
