import { handleImages } from "~/server/helpers"
import { CatalogLink, FullCatalogItem, fullCatalogItemSchema } from "~/types/catalog"
import { Image } from "~/types/common"
import { getBriefAgrigationValue } from "~/utils/all"
const filePath = import.meta.url

const ensureCorrespondingRewardsToItems = async (catalog_item_id: number, rewardIds: number[]) => {
  const records = await queries().catalogRewardsToItems.getAllByCatalogItemId(catalog_item_id)

  // удаляем из бд, которых нету в свежих, уменьшаем список свежих наград, чтоб создать из остатка
  for (const record of records) {
    const index = rewardIds.indexOf(record.catalog_reward_id)

    if (index !== -1) {
      rewardIds.splice(index, 1)
    } else {
      await queries().catalogRewardsToItems.delete(record.id)
    }
  }

  // создаём
  for (const catalog_reward_id of rewardIds) {
    await queries().catalogRewardsToItems.create({ catalog_item_id, catalog_reward_id })
  }
}

const ensureCorrespondingAdminsToItems = async (catalog_item_id: number, adminIds: number[]) => {
  // то что лежит в бд
  const records = await queries().catalogAdminsToItems.getAllByCatalogItemId(catalog_item_id)

  // удаляем из бд, которых нету в свежих, уменьшаем список свежих наград, чтоб создать из остатка

  for (const record of records) {
    const index = adminIds.indexOf(record.catalog_admin_id)

    if (index !== -1) {
      adminIds.splice(index, 1)
    } else {
      await queries().catalogRewardsToItems.delete(record.id)
    }
  }

  // создаём
  for (const catalog_admin_id of adminIds) {
    await queries().catalogAdminsToItems.create({ catalog_item_id, catalog_admin_id })
  }
}

const ensureCorrespondingLinks = async (catalog_item_id: number, links: CatalogLink[]) => {
  const initAcc: { items_before: CatalogLink[]; items_new: CatalogLink[] } = { items_before: [], items_new: [] }
  const { items_before, items_new } = links.reduce((acc, item) => {
    if (item.id) acc.items_before.push(item)
    else acc.items_new.push(item)
    return acc
  }, initAcc)

  // delete, update
  const db_links_before = await queries().catalogLinks.getAllByCatalogItemId(catalog_item_id)
  const items_ids_before = items_before.map((i) => i.id)
  for (const db_link_before of db_links_before) {
    if (!items_ids_before.includes(db_link_before.id)) {
      await queries().catalogLinks.delete(db_link_before.id)
    } else {
      const item = items_before.find((i) => i.id == db_link_before.id)
      if (item) await queries().catalogLinks.update(db_link_before.id, item)
    }
  }
  // create
  for (const link of items_new) {
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
  if (!itemJson.id) throw new Error("if (!itemJson.id) throw new Error")

  // добавление предидущего значения в brief
  const db_item_before = await queries().catalogItem.getById(itemJson.id)
  const briefTotalScoreBefore = getBriefAgrigationValue({ items: db_item_before.brief.items }).sumValue
  const briefTotalScoreAfter = getBriefAgrigationValue({ items: itemJson.brief.items }).sumValue

  if (briefTotalScoreBefore !== briefTotalScoreAfter) {
    itemJson.brief.lastAgrigation.sumValue = briefTotalScoreBefore
  }

  const db_item = await queries().catalogItem.update(itemJson.id!, itemJson)
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
  const imagesBefore = (await queries().images.getById({ refer_id: db_item.id, refer_type: "catalog-item" })) as Image[]

  handleImages({
    imagesBefore,
    imagesAfter: itemJson.images,
    refer_id: db_item.id,
    refer_type: "catalog-item",
  })

  ensureCorrespondingLinks(db_item.id, itemJson.links)
  ensureCorrespondingRewardsToItems(db_item.id, itemJson.catalog_reward_ids)
  ensureCorrespondingAdminsToItems(db_item.id, itemJson.catalog_admin_ids)

  return { success: true }
})
