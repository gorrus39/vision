import { CatalogAdmin, CatalogReward } from "~/types/catalog"
import { Image } from "~/types/common"

export default defineEventHandler(async (): Promise<CatalogReward[]> => {
  const catalogRewards = await queries().catalogRewards.getAll()
  const refer_ids = catalogRewards.map((i) => i.id)
  const images = (await queries().images.getByIds({ refer_ids, refer_type: "catalog-reward" })) as Image[]

  const imagesMap: Record<string, Image[]> = {}
  for (const image of images) {
    if (String(image.refer_id) in imagesMap) {
      imagesMap[String(image.refer_id)].push(image)
    } else {
      imagesMap[String(image.refer_id)] = [image]
    }
  }
  const catalogRewardsWithImages: CatalogReward[] = catalogRewards.map((a) => ({
    ...a,
    images: imagesMap[a.id] || [],
  }))

  return catalogRewardsWithImages
})
