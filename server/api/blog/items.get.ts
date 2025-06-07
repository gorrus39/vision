import { BlogItem } from "~/types/blog"
import { Image } from "~/types/common"

export default defineEventHandler(async (): Promise<BlogItem[]> => {
  const blogItems = await queries().blogItems.getAll()
  const refer_ids = blogItems.map((i) => i.id)
  const blogImages = (await queries().images.getByIds({ refer_ids, refer_type: "blog" })) as Image[]

  const imagesMap: Record<string, Image[]> = {}
  for (const image of blogImages) {
    if (String(image.refer_id) in imagesMap) {
      imagesMap[String(image.refer_id)].push(image)
    } else {
      imagesMap[String(image.refer_id)] = [image]
    }
  }
  const blogItemsWithImages = blogItems.map((b) => ({
    ...b,
    images: imagesMap[b.id] || [],
  }))

  return blogItemsWithImages
})
