import { Image } from "~/types/common"
import { FullFaqItem } from "~/types/faq"

export default defineEventHandler(async (): Promise<FullFaqItem[]> => {
  const faqItems = await queries().faqItems.getAll()
  const refer_ids = faqItems.map((i) => i.id)
  const faqImages = (await queries().images.getByIds({ refer_ids, refer_type: "faq" })) as Image[]

  const imagesMap: Record<string, Image[]> = {}
  for (const image of faqImages) {
    if (String(image.refer_id) in imagesMap) {
      imagesMap[String(image.refer_id)].push(image)
    } else {
      imagesMap[String(image.refer_id)] = [image]
    }
  }
  const faqItemsWithImages = faqItems.map((f) => ({
    ...f,
    images: imagesMap[f.id] || [],
  }))

  return faqItemsWithImages
})
