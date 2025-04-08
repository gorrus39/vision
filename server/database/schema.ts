import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Определяем таблицу blog_items
export const blogItems = sqliteTable("blog_items", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  published_at: integer("published_at", { mode: "timestamp" }).notNull(), // Дата публикации
  category: text("category").notNull().default("Uncategorized"), // Категория
  title: text("title").notNull(), // Заголовок
  image_paths: text("image_paths").default("[null,null,null,null,null]"), // Ссылка на изображение (может быть null)
  sub_title: text("sub_title"), // Подзаголовок (может быть null)
  text: text("text").notNull(), // Основной текст
  order_index: integer("order_index").notNull(), // Индекс порядка
  priority: text("priority", { enum: ["High", "Low"] }).notNull(), // Приоритет (ENUM)
  lang: text("lang", { enum: ["en", "ru", "cn"] }).default("en"),
});
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
export const catalogItems = sqliteTable("catalogItems", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  title: text("title").notNull(),
});
////////////////
export const catalogAdmins = sqliteTable("catalogAdmins", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  avatar_path: text("avatar_path").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
});

export const catalogAdminsToItems = sqliteTable("catalogAdminsToItems", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  catalog_admin_id: integer("catalog_admin_id")
    .notNull()
    .references(() => catalogAdmins.id, { onDelete: "cascade" }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
  catalog_item_id: integer("catalog_item_id")
    .notNull()
    .references(() => catalogItems.id, { onDelete: "cascade" }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
});
////////////////
export const rewards = sqliteTable("rewards", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  img_path: text("img_path").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const catalogRewardsToItems = sqliteTable("catalogRewardsToItems", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  catalog_reward_id: integer("catalog_reward_id")
    .notNull()
    .references(() => rewards.id, { onDelete: "cascade" }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
  catalog_item_id: integer("catalog_item_id")
    .notNull()
    .references(() => catalogItems.id, { onDelete: "cascade" }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
});
////////////////
export const catalogTagsLine1 = sqliteTable("catalogTagsLine1", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  name: text("name").notNull(),
});

export const catalogTagsLine1ToItems = sqliteTable("catalogTagsLine1ToItems", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  catalog_tags_line_1_id: integer("catalog_tags_line_1_id").references(() => catalogTagsLine1.id, {
    onDelete: "cascade",
  }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
  catalog_item_id: integer("catalog_item_id").references(() => catalogItems.id, { onDelete: "cascade" }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
});
///
export const catalogTagsLine2 = sqliteTable("catalogTagsLine2", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  name: text("name").notNull(),
});

export const catalogTagsLine2ToItems = sqliteTable("catalogTagsLine2ToItems", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  catalog_tags_line_2_id: integer("catalog_tags_line_2_id").references(() => catalogTagsLine2.id, {
    onDelete: "cascade",
  }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
  catalog_item_id: integer("catalog_item_id").references(() => catalogItems.id, { onDelete: "cascade" }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
});
///
export const catalogTagsLine3 = sqliteTable("catalogTagsLine3", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  name: text("name").notNull(),
});

export const catalogTagsLine3ToItems = sqliteTable("catalogTagsLine3ToItems", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  catalog_tags_line_3_id: integer("catalog_tags_line_3_id").references(() => catalogTagsLine3.id, {
    onDelete: "cascade",
  }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
  catalog_item_id: integer("catalog_item_id").references(() => catalogItems.id, { onDelete: "cascade" }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
});
////////////////
export const catalogLinks = sqliteTable("catalogLinks", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  catalog_item_id: integer("catalog_item_id").references(() => catalogItems.id, { onDelete: "cascade" }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
  img_path: text("img_path").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
  src_platform: text("src_platform"),
});
/////
export const reitings = sqliteTable("reitings", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  catalog_item_id: integer("catalog_item_id").references(() => catalogItems.id, { onDelete: "cascade" }), // <-- КАСКАДНОЕ УДАЛЕНИЕ
  value: integer("value"),
  created_at: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
