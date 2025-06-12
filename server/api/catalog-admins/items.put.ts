import { handleImages } from "~/server/helpers"
import { catalogAdminSchema } from "~/types/catalog"
import { Image } from "~/types/common"
const filePath = import.meta.url

export default defineEventHandler(async (event): Promise<{ error?: string }> => {
  const formData = await readMultipartFormData(event)
  if (!formData) return { error: `${filePath} -> (!FormData)` }

  const id = Number(getQuery(event).id)
  if (isNaN(id)) return { error: `${filePath} -> (isNaN(id))` }

  const db_item_catalog_admin = await queries().catalogAdmin.getById(id)
  if (db_item_catalog_admin === undefined) return { error: `${filePath} -> (db_item_catalog_admin === undefined)` }

  const formDataItem = formData.find((part) => part.name == "catalogAdminItemJson")
  if (!formDataItem) return { error: `${filePath} -> (faqItemJson not found)` }

  const formDataItemJson = JSON.parse(formDataItem?.data.toString() || "")
  const { data: itemJson, success, error } = catalogAdminSchema.safeParse(formDataItemJson)

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

  const [db_item] = await queries().catalogAdmin.update(id, itemJson)
  const imagesBefore = (await queries().images.getById({
    refer_id: db_item.id,
    refer_type: "catalog-admin",
  })) as Image[]

  handleImages({
    imagesBefore,
    imagesAfter: itemJson.images,
    refer_id: db_item.id,
    refer_type: "catalog-admin",
  })

  return {}
})
