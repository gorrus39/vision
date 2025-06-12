import { CatalogAdmin } from "~/types/catalog"
import { Image } from "~/types/common"

export default defineEventHandler(async (): Promise<CatalogAdmin[]> => {
  const catalogAdmins = await queries().catalogAdmin.getAll()
  const refer_ids = catalogAdmins.map((i) => i.id)
  const images = (await queries().images.getByIds({ refer_ids, refer_type: "catalog-admin" })) as Image[]

  const imagesMap: Record<string, Image[]> = {}
  for (const image of images) {
    if (String(image.refer_id) in imagesMap) {
      imagesMap[String(image.refer_id)].push(image)
    } else {
      imagesMap[String(image.refer_id)] = [image]
    }
  }
  const catalogAdminsWithImages: CatalogAdmin[] = catalogAdmins.map((a) => ({
    ...a,
    images: imagesMap[a.id] || [],
  }))

  return catalogAdminsWithImages
})
