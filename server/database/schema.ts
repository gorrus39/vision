import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Определяем таблицу blog_items
export const blogItems = sqliteTable("blog_items", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Автоинкрементный ID
  published_at: integer("published_at", { mode: "timestamp" }).notNull(), // Дата публикации
  category: text("category").notNull().default("Uncategorized"), // Категория
  title: text("title").notNull(), // Заголовок
  img: text("img"), // Ссылка на изображение (может быть null)
  sub_title: text("sub_title"), // Подзаголовок (может быть null)
  text: text("text").notNull(), // Основной текст
  priority: text("priority", { enum: ["High", "Low"] }).notNull(), // Приоритет (ENUM)
  order_index: integer("order_index").notNull(), // Индекс порядка
  // filePath: text("file_path"), // Путь к файлу (если загружается)
  modified: text("modified", { enum: ["created", "updated", "deleted"] }), // Тип изменения
});
