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
