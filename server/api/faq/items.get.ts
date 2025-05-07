import { FullFaqItem } from "~/types/faq"

export default defineEventHandler(async (): Promise<FullFaqItem[]> => {
  return await queries().faqItems.getAllWithImages()
})
