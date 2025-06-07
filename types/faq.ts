import { z } from "zod"
import { imageSchema } from "./common"

export const fullFaqItemSchema = z.object({
  id: z.coerce.number().optional(), // 🔥 Автоматическое приведение строки к числу
  title: z.string().min(1).max(60),
  text: z.string().min(1).max(6000),
  category: z.string().min(1).max(15),
  sub_title: z.string().max(50).optional(),
  order_index: z.coerce.number(), // 🔥 Преобразование строки в число
  priority: z.enum(["High", "Low"]),
  lang: z.enum(["en", "ru", "cn"]),

  images: z.array(imageSchema),

  // только для фронта
  matchesFilter: z.boolean().optional(),
})

export type FullFaqItem = z.infer<typeof fullFaqItemSchema>
