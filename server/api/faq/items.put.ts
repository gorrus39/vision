import { FaqImage, FullFaqItem, fullFaqItemSchema } from "~/types/faq"
const filePath = import.meta.url

const createImageWithBlob = async (
  db_item: Omit<FullFaqItem, "images">,
  imageJson: FaqImage & { frontendFile: File },
) => {
  if (imageJson.pathTemp?.startsWith("http")) {
    await queries().faqImage.create({ ...imageJson, path_server: imageJson.pathTemp }, db_item.id!)
    return
  }

  const { pathname } = await hubBlob().put(`faq_item_id_${db_item.id}-${imageJson.fileName}`, imageJson.frontendFile, {
    prefix: "images-faq",
  })
  await queries().faqImage.create({ ...imageJson, path_server: pathname }, db_item.id!)
}

const updateImageWithBlob = async (imageBefore: FaqImage, imageAfter: FaqImage & { frontendFile: File }) => {
  const newDirectLink = imageAfter.pathTemp?.startsWith("http")
  const wasDirectLink = imageBefore.pathTemp?.startsWith("http")
  if (!wasDirectLink) await hubBlob().delete(imageBefore.path_server!)

  if (newDirectLink) {
    queries().faqImage.update(imageAfter.id!, imageAfter)
  } else {
    const { pathname } = await hubBlob().put(
      `faq_item_id_${imageAfter.id}-${imageAfter.fileName}`,
      imageAfter.frontendFile,
      {
        prefix: "images-faq",
      },
    )
    queries().faqImage.update(imageAfter.id!, { ...imageAfter, path_server: pathname })
  }
}

export default defineEventHandler(async (event): Promise<{ error?: string }> => {
  const formData = await readMultipartFormData(event)
  if (!formData) return { error: `${filePath} -> (!FormData)` }

  const id = Number(getQuery(event).id)
  if (isNaN(id)) return { error: `${filePath} -> (isNaN(id))` }

  const db_item_faq = await queries().faqItems.getByIdWithImages(id)
  if (db_item_faq === undefined) return { error: `${filePath} -> (db_item_faq === undefined)` }

  const formDataItem = formData.find((part) => part.name == "faqItemJson")
  if (!formDataItem) return { error: `${filePath} -> (faqItemJson not found)` }

  const formDataItemJson = JSON.parse(formDataItem?.data.toString() || "")
  const { data: itemJson, success, error } = fullFaqItemSchema.safeParse(formDataItemJson)

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

  const [db_item] = await queries().faqItems.update(id, itemJson)

  const imagesBefore = [...db_item_faq.images]
  const imagesAfter = [...itemJson.images]

  // Определение: какие изображения создавать
  const newImages = imagesAfter.filter((img) => !img.id && img.frontendFile)

  // Определение: какие изображения обновлять
  const updatedImages = imagesAfter
    .map((img) => {
      const before = imagesBefore.find((b) => b.id === img.id)
      const changed = before && before.path_server !== img.path_server
      return changed ? ([before, img] as const) : null
    })
    .filter(Boolean) as (readonly [FaqImage, FaqImage & { frontendFile: File }])[]

  // Определение: какие изображения удалять
  const remainingIds = new Set(imagesAfter.map((i) => i.id))
  const deletedImages = imagesBefore.filter((img) => !remainingIds.has(img.id))

  // Создание
  for (const img of newImages) {
    await createImageWithBlob(db_item, img as FaqImage & { frontendFile: File })
  }

  // Обновление
  for (const [before, after] of updatedImages) {
    await updateImageWithBlob(before, after)
  }

  // Удаление
  for (const img of deletedImages) {
    if (!img.path_server.startsWith("http")) {
      await hubBlob().delete(img.path_server)
    }
    await queries().faqImage.delete(img.id)
  }

  return {}
})
