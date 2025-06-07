import { Image, SlugAsset } from "~/types/common"
import { FullFaqItem } from "~/types/faq"

export default defineEventHandler(async (): Promise<SlugAsset[]> => {
  const slugAssetItems = await queries().slugAssets.getAll()
  const refer_ids = slugAssetItems.map((i) => i.id)
  const images = (await queries().images.getByIds({ refer_ids, refer_type: "slug-asset" })) as Image[]

  const imagesMap: Record<string, Image[]> = {}
  for (const image of images) {
    if (String(image.refer_id) in imagesMap) {
      imagesMap[String(image.refer_id)].push(image)
    } else {
      imagesMap[String(image.refer_id)] = [image]
    }
  }

  const slugAssetItemsWithImages = slugAssetItems.map((s) => ({
    ...s,
    images: imagesMap[s.id] || [],
  }))

  return slugAssetItemsWithImages
})
