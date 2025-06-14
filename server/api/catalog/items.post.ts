import { handleImages } from "~/server/helpers"
import { CatalogLink, fullCatalogItemSchema } from "~/types/catalog"
const filePath = import.meta.url

const createCorrespondingRewardsToItems = async (itemId: number, rewardIds: number[]) => {
  for (const rewardId of rewardIds) {
    await queries().catalogRewardsToItems.create({ catalog_item_id: itemId, catalog_reward_id: rewardId })
  }
}

const createCorrespondingAdminsToItems = async (itemId: number, adminIds: number[]) => {
  for (const adminId of adminIds) {
    await queries().catalogAdminsToItems.create({ catalog_item_id: itemId, catalog_admin_id: adminId })
  }
}

const createCorrespondingLinks = async (catalog_item_id: number, links: CatalogLink[]) => {
  for (const link of links) {
    await queries().catalogLinks.create({ ...link, catalog_item_id })
  }
}

export default eventHandler(async (event): Promise<{ success?: boolean; error?: string }> => {
  const formData = await readMultipartFormData(event)
  if (!formData) return { error: filePath }
  const formDataItem = formData.find((part) => part.name == "catalogItemJson")
  const formDataItemJson = JSON.parse(formDataItem?.data.toString() || "")

  const { success, data: itemJson, error } = fullCatalogItemSchema.safeParse(formDataItemJson)
  if (error) return { error: JSON.stringify(error.errors[0]) }

  const db_item = await queries().catalogItem.create(itemJson)
  if (!db_item.id) throw new Error("(!db_item.id)")

  // invoke frontend images files in faqItemJson
  for (const { name, data } of formData) {
    const regExpArr = name?.match(/^photo__index_(.+)$/)
    if (!regExpArr) continue
    const index = +regExpArr[1]
    const image = itemJson.images[index]
    const frontendFile = new File([data], image.fileName || "undefined", { type: image.fileType })
    image.frontendFile = frontendFile
  }

  handleImages({
    imagesBefore: [],
    imagesAfter: itemJson.images,
    refer_id: db_item.id,
    refer_type: "catalog-item",
  })

  createCorrespondingLinks(db_item.id, itemJson.links)
  createCorrespondingRewardsToItems(db_item.id, itemJson.catalog_reward_ids)
  createCorrespondingAdminsToItems(db_item.id, itemJson.catalog_admin_ids)

  return { success: true }
})
