import { BriefItemJson, CatalogLink, FullBriefJson, FullCatalogItem, fullCatalogItemSchema } from "~/types/catalog"
import { getBriefAgrigationValue, hasBriefScoreDiffs, putBlobCatalogItem } from "~/utils/all"
import { deleteBlobItem } from "~/utils/blog"

const ensureCorrespondingRewardsToItems = async (itemId: number, rewardIds: number[]) => {
  // то что лежит в бд
  const rewardsToItemsBefore = await queries().catalogRewardsToItems.getAllByCatalogItemId(itemId)

  // удаляем из бд, которых нету в свежих, уменьшаем список свежих наград, чтоб создать из остатка
  for (const db_r of rewardsToItemsBefore) {
    if (!rewardIds.includes(db_r.catalog_reward_id)) {
      await queries().catalogRewardsToItems.delete(db_r.id)
      rewardIds.splice(db_r.catalog_reward_id)
    }
  }

  // создаём
  for (const restId of rewardIds) {
    await queries().catalogRewardsToItems.create({ catalog_item_id: itemId, catalog_reward_id: restId })
  }
}

const ensureCorrespondingAdminsToItems = async (catalog_item_id: number, adminIds: number[]) => {
  // то что лежит в бд
  const adminsToItemsBefore = await queries().catalogAdminsToItems.getAllByCatalogItemId(catalog_item_id)

  // удаляем из бд, которых нету в свежих, уменьшаем список свежих наград, чтоб создать из остатка
  for (const db_r of adminsToItemsBefore) {
    if (!adminIds.includes(db_r.catalog_admin_id)) {
      await queries().catalogAdminsToItems.delete(db_r.id)
      adminIds.splice(db_r.catalog_admin_id)
    }
  }

  // создаём
  for (const catalog_admin_id of adminIds) {
    await queries().catalogAdminsToItems.create({ catalog_item_id, catalog_admin_id })
  }
}

// const ensureCorrespondingReitings = async (catalog_item_id: number, reitings: Reiting[]) => {
//   const newReitings = reitings.filter((r) => r.id == undefined);
//   for (const reiteing of newReitings) {
//     const value = reiteing.value;
//     await queries().reitings.create({ catalog_item_id, value });
//   }
// };

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
  if (!formData) return { error: "undefined FormData 1" }

  let itemJson: FullCatalogItem | {} = {}

  let fileBuffer__short: Buffer<ArrayBufferLike> | null = null
  let fileName__short: string | null = null
  let fileType__short: string | null = null

  let fileBuffer__large: Buffer<ArrayBufferLike> | null = null
  let fileName__large: string | null = null
  let fileType__large: string | null = null

  formData.forEach((part) => {
    if (part.name == "itemJson") {
      itemJson = JSON.parse(part.data.toString()) as FullCatalogItem
    } else if (part.name == "frontendFileShort") {
      fileBuffer__short = part.data
    } else if (part.name == "frontendFileShort.name") {
      fileName__short = part.data.toString()
    } else if (part.name == "frontendFileShort.type") {
      fileType__short = part.data.toString()
    } else if (part.name == "frontendFileLarge") {
      fileBuffer__large = part.data
    } else if (part.name == "frontendFileLarge.name") {
      fileName__large = part.data.toString()
    } else if (part.name == "frontendFileLarge.type") {
      fileType__large = part.data.toString()
    }
  })

  const { success, data, error } = fullCatalogItemSchema.safeParse(itemJson)
  if (error) return { error: JSON.stringify(error.errors[0]) }
  if (!data.id) return { error: "error. has no id, when update item" }
  /////////////////////
  /////////////////////
  const [db_item] = await queries().catalogItem.getById(data.id)

  const changedImgShortPath = db_item.img_short_path !== data.img_short_path
  const changedImgLargePath = db_item.img_large_path !== data.img_large_path

  if (changedImgShortPath) {
    if (!fileBuffer__short || !fileName__short || !fileType__short) return { error: "!fileType__short" }
    const file__short = new File([fileBuffer__short], fileName__short, { type: fileType__short })
    if (db_item.img_short_path?.startsWith("catalog-items")) await deleteBlobItem(db_item.img_short_path)
    const img_short_path = await putBlobCatalogItem(db_item, file__short)
    await queries().catalogItem.update(db_item.id, { ...db_item, img_short_path })
  }

  if (changedImgLargePath) {
    if (!fileBuffer__large || !fileName__large || !fileType__large) return { error: "!fileType__large" }
    const file__large = new File([fileBuffer__large], fileName__large, { type: fileType__large })
    if (db_item.img_large_path?.startsWith("catalog-items")) await deleteBlobItem(db_item.img_large_path)
    const img_large_path = await putBlobCatalogItem(db_item, file__large)
    await queries().catalogItem.update(db_item.id, { ...db_item, img_large_path })
  }

  ensureCorrespondingLinks(db_item.id, data.links)

  // ensureCorrespondingReitings(db_item.id, data.reitings);

  ensureCorrespondingRewardsToItems(
    db_item.id,
    data.rewards.map((reward) => reward.id!),
  )

  ensureCorrespondingAdminsToItems(
    db_item.id,
    data.admins.map((admin) => admin.id!),
  )

  const { rewards, admins, ...rest } = data

  // проверка на изменение brief и пересчёт lastSum, если было
  // сравниваем значения которые были в бд с пришедшими

  const briefItemsBefore = JSON.parse(db_item.brief).items
  const briefItemsAfter = JSON.parse(rest.brief).items
  if (hasBriefScoreDiffs({ briefItemsBefore, briefItemsAfter })) {
    const lastAgrigation = getBriefAgrigationValue({ items: briefItemsBefore })
    const briefJson = JSON.parse(rest.brief) as FullBriefJson
    briefJson.lastAgrigation = lastAgrigation
    rest.brief = JSON.stringify(briefJson)
  }

  await queries().catalogItem.update(db_item.id, rest)

  return { success: true }
})
