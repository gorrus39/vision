import { handleImages } from "~/server/helpers"
import { Image, slugAssetSchema } from "~/types/common"
const filePath = import.meta.url

export default defineEventHandler(async (event): Promise<{ error?: string }> => {
  const formData = await readMultipartFormData(event)
  if (!formData) return { error: `${filePath} -> (!FormData)` }

  const id = Number(getQuery(event).id)
  if (isNaN(id)) return { error: `${filePath} -> (isNaN(id))` }

  const db_item_slug_asset = await queries().slugAssets.getById(id)
  if (db_item_slug_asset === undefined) return { error: `${filePath} -> (db_item_slug_asset === undefined)` }

  const formDataItem = formData.find((part) => part.name == "slugAssetItemJson")
  if (!formDataItem) return { error: `${filePath} -> (slugAssetItemJson not found)` }

  const formDataItemJson = JSON.parse(formDataItem?.data.toString() || "")
  const { data: itemJson, success, error } = slugAssetSchema.safeParse(formDataItemJson)

  if (error) return { error: JSON.stringify(error) }

  // attach фаилы с фронта, которые были на вронтовом объекте привязываем обратно
  for (const { name, data } of formData) {
    const match = name?.match(/^photo__index_(\d+)$/)
    if (!match) continue
    const index = Number(match[1])
    const image = itemJson.images[index]
    if (!image) continue
    image.frontendFile = new File([data], image.fileName || "undefined", { type: image.fileType })
  }

  const [db_item] = await queries().slugAssets.update(id, itemJson)
  const imagesBefore = (await queries().images.getById({ refer_id: db_item.id, refer_type: "slug-asset" })) as Image[]

  handleImages({
    imagesBefore,
    imagesAfter: itemJson.images,
    refer_id: db_item.id,
    refer_type: "slug-asset",
  })

  return {}
})
