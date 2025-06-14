import { CatalogItem, CatalogLink, FullCatalogItem } from "~/types/catalog"
import { Image } from "~/types/common"

export default eventHandler(async (event): Promise<FullCatalogItem[]> => {
  const items: CatalogItem[] = await queries().catalogItem.getAll()

  const db_rewardsToItems = await queries().catalogRewardsToItems.getAll()
  const db_adminsToItems = await queries().catalogAdminsToItems.getAll()

  type CatalogId = number
  type RewardId = number
  type AdminId = number

  const map_rewards: { [key: CatalogId]: RewardId[] } = db_rewardsToItems.reduce(
    (acc, rewardToItem) => {
      const reward_id = rewardToItem.catalog_reward_id
      const item_id = rewardToItem.catalog_item_id
      if (item_id in acc) acc[item_id].push(reward_id)
      else acc[item_id] = [reward_id]
      return acc
    },
    {} as { [key: CatalogId]: RewardId[] },
  )

  const map_admins: { [key: CatalogId]: AdminId[] } = db_adminsToItems.reduce(
    (acc, adminToItem) => {
      const admin_id = adminToItem.catalog_admin_id
      const item_id = adminToItem.catalog_item_id
      if (item_id in acc) acc[item_id].push(admin_id)
      else acc[item_id] = [admin_id]
      return acc
    },
    {} as { [key: CatalogId]: AdminId[] },
  )

  const db_links = await queries().catalogLinks.getAll()
  const map_links = new Map<number, CatalogLink[]>()
  db_links.forEach((db_link) => {
    const item_id = db_link.catalog_item_id

    if (item_id) {
      if (map_links.has(item_id)) {
        ;(map_links.get(item_id) as CatalogLink[]).push(db_link)
      } else {
        map_links.set(item_id, [db_link])
      }
    }
  })

  const refer_ids = items.map((i) => i.id || -1)
  const catalogItemImages = (await queries().images.getByIds({
    refer_ids,
    refer_type: "catalog-item",
  })) as Image[]

  const imagesMap: Record<string, Image[]> = {}
  for (const image of catalogItemImages) {
    if (String(image.refer_id) in imagesMap) {
      imagesMap[String(image.refer_id)].push(image)
    } else {
      imagesMap[String(image.refer_id)] = [image]
    }
  }

  const fullItems: FullCatalogItem[] = items.map((item) => {
    const catalog_reward_ids = map_rewards[item.id!] || []

    const catalog_admin_ids = map_admins[item.id!] || []
    const links = map_links.get(item.id!) || []
    const images = imagesMap[item.id!] || []
    return {
      ...item,
      images,
      catalog_reward_ids,
      catalog_admin_ids,
      links,
    }
  })

  return fullItems
})
