import z from "zod";

export enum ProjectType {
  type,
}

export type Project = {
  id: number;
  title: string;
  type: ProjectType;
  text: string;
  starsAmount: number;
  avatar?: string;
};

const FileSchema = z.instanceof(File);

export const BlogItemSchema = z.object({
  id: z.coerce.number(), // 🔥 Автоматическое приведение строки к числу
  published_at: z.coerce.date(), // 🔥 Преобразует строку в Date
  category: z.string().min(1).max(15),
  title: z.string().min(1).max(30),
  // image_paths: z.string().nullable(),

  image_paths: z.union([z.string(), z.array(z.string().nullable())]).transform((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val) as (string | null)[];
      } catch {
        return [];
      }
    }
    return val; // Теперь если val уже массив, просто возвращаем его
  }),
  sub_title: z.string().max(50).optional().nullable(),
  text: z.string().min(1).max(2000),
  priority: z.enum(["High", "Low"]),
  order_index: z.coerce.number(), // 🔥 Преобразование строки в число
  lang: z.enum(["en", "ru", "cn"]),

  files: z.array(z.instanceof(File).nullable()).optional(),
  modified: z.enum(["created", "updated", "deleted"]).optional().nullable(),
});

export const BlogItemsSchema = z.array(BlogItemSchema);

export type BlogItem = z.infer<typeof BlogItemSchema>;

export type FAQItem = {
  id: number;
  title: string;
  text: string;
};
