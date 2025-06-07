import { handleImages } from "~/server/helpers"
import { fullFaqItemSchema } from "~/types/faq"
const filePath = import.meta.url

export default defineEventHandler(async (event): Promise<{ error?: string }> => {
  const formData = await readMultipartFormData(event)
  if (!formData) return { error: filePath }

  const formDataItem = formData.find((part) => part.name == "faqItemJson")

  const formDataItemJson = JSON.parse(formDataItem?.data.toString() || "")
  const { data: itemJson, success, error } = fullFaqItemSchema.safeParse(formDataItemJson)
  if (error) return { error: JSON.stringify(error) }

  // invoke frontend images files in faqItemJson
  for (const { name, data } of formData) {
    const regExpArr = name?.match(/^photo__index_(.+)$/)
    if (!regExpArr) continue
    const index = +regExpArr[1]
    const image = itemJson.images[index]
    const frontendFile = new File([data], image.fileName || "undefined", { type: image.fileType })
    image.frontendFile = frontendFile
  }

  const [db_item] = await queries().faqItems.create(itemJson)

  handleImages({ imagesBefore: [], imagesAfter: itemJson.images, refer_id: db_item.id, refer_type: "faq" })

  return {}
})
