import { CatalogLink, FullCatalogItem, fullCatalogItemSchema } from "~/types/catalog"
import { putBlobCatalogItem } from "~/utils/all"

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

// const createCorrespondingReitings = async (catalog_item_id: number, reitings: Reiting[]) => {
//   for (const reiteing of reitings) {
//     const value = reiteing.value
//     await queries().reitings.create({ catalog_item_id, value })
//   }
// }

const createCorrespondingLinks = async (catalog_item_id: number, links: CatalogLink[]) => {
  for (const link of links) {
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

  const [db_item] = await queries().catalogItem.create(data)

  if (
    !fileBuffer__short ||
    !fileName__short ||
    !fileType__short ||
    !fileBuffer__large ||
    !fileName__large ||
    !fileType__large
  )
    return { error: "!fileType__short || !fileType__short || !fileType__short" }

  const file__short = new File([fileBuffer__short], fileName__short, { type: fileType__short })
  const img_short_path = await putBlobCatalogItem(db_item, file__short)

  const file__large = new File([fileBuffer__large], fileName__large, { type: fileType__large })
  const img_large_path = await putBlobCatalogItem(db_item, file__large)

  await queries().catalogItem.update(db_item.id, { ...db_item, img_short_path, img_large_path })

  createCorrespondingLinks(db_item.id, data.links)

  // createCorrespondingReitings(db_item.id, data.reitings);

  createCorrespondingRewardsToItems(
    db_item.id,
    data.rewards.map((reward) => reward.id!),
  )

  createCorrespondingAdminsToItems(
    db_item.id,
    data.admins.map((admin) => admin.id!),
  )

  return { success: true }
})
