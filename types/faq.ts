import { z } from "zod"

export const faqImage = z.object({
  id: z.number().optional(),
  faq_item_id: z.number().optional(),

  path_server: z.string().optional(),
  is_title: z.boolean(),

  pathTemp: z.string().optional(),
  frontendFile: z.instanceof(File).nullable().optional(),
  fileName: z.string().optional(),
  fileType: z.string().optional(),
})

export const fullFaqItemSchema = z.object({
  id: z.coerce.number().optional(), // 🔥 Автоматическое приведение строки к числу
  title: z.string().min(1).max(60),
  text: z.string().min(1).max(6000),
  category: z.string().min(1).max(15),
  sub_title: z.string().max(50).optional().nullable(),
  order_index: z.coerce.number(), // 🔥 Преобразование строки в число
  priority: z.enum(["High", "Low"]),
  lang: z.enum(["en", "ru", "cn"]),

  images: z.array(faqImage),
})

export type FullFaqItem = z.infer<typeof fullFaqItemSchema>
export type FaqImage = z.infer<typeof faqImage>
