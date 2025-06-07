import { handleImages } from "~/server/helpers"
import { fullBlogItemSchema } from "~/types/blog"
import { Image } from "~/types/common"
import { FullFaqItem, fullFaqItemSchema } from "~/types/faq"
const filePath = import.meta.url

export default defineEventHandler(async (event): Promise<{ error?: string }> => {
  const formData = await readMultipartFormData(event)
  if (!formData) return { error: `${filePath} -> (!FormData)` }

  const id = Number(getQuery(event).id)
  if (isNaN(id)) return { error: `${filePath} -> (isNaN(id))` }

  const db_item_blog = await queries().blogItems.getById(id)
  if (db_item_blog === undefined) return { error: `${filePath} -> (db_item_blog === undefined)` }

  const formDataItem = formData.find((part) => part.name == "blogItemJson")
  if (!formDataItem) return { error: `${filePath} -> (blogItemJson not found)` }

  const formDataItemJson = JSON.parse(formDataItem?.data.toString() || "")
  const { data: itemJson, success, error } = fullBlogItemSchema.safeParse(formDataItemJson)

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

  const [db_item] = await queries().blogItems.update(id, itemJson)
  const imagesBefore = (await queries().images.getById({ refer_id: db_item.id, refer_type: "blog" })) as Image[]

  handleImages({
    imagesBefore,
    imagesAfter: itemJson.images,
    refer_id: db_item.id,
    refer_type: "blog",
  })

  return {}
})
