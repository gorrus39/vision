import { CatalogItem, FullCatalogItem, Reiting } from "~/types/catalog";

export default eventHandler(async (event): Promise<FullCatalogItem[]> => {
  const items: CatalogItem[] = await queries().catalogItem.getAll();

  // проходим по таблицам один раз
  const db_catalog_rewards = await queries().catalogRewards.getAll();
  const db_rewardsToItems = await queries().catalogRewardsToItems.getAll();

  const db_admins = await queries().catalogAdmin.getAll();
  const db_adminsToItems = await queries().catalogAdminsToItems.getAll();

  const db_reitings = await queries().reitings.getAll();

  const map_rewardsToItems = new Map<number, number[]>();
  db_rewardsToItems.forEach((db_rewardToItem) => {
    const item_id = db_rewardToItem.catalog_item_id;
    const reward_id = db_rewardToItem.catalog_reward_id;
    if (map_rewardsToItems.has(item_id)) {
      (map_rewardsToItems.get(item_id) as number[]).push(reward_id);
    } else {
      map_rewardsToItems.set(item_id, [reward_id]);
    }
  });

  const map_adminsToItems = new Map<number, number[]>();
  db_adminsToItems.forEach((db_adminToItem) => {
    const item_id = db_adminToItem.catalog_item_id;
    const admin_id = db_adminToItem.catalog_admin_id;
    if (map_adminsToItems.has(item_id)) {
      (map_adminsToItems.get(item_id) as number[]).push(admin_id);
    } else {
      map_adminsToItems.set(item_id, [admin_id]);
    }
  });

  const map_reitings = new Map<number, Reiting[]>();
  db_reitings.forEach((db_reiting) => {
    const item_id = db_reiting.catalog_item_id;
    if (item_id) {
      if (map_reitings.has(item_id)) {
        (map_reitings.get(item_id) as Reiting[]).push(db_reiting);
      } else {
        map_reitings.set(item_id, [db_reiting]);
      }
    }
  });

  // Создаём массив FullCatalogItem
  const fullItems: FullCatalogItem[] = items.map((item) => {
    const rewardIds = map_rewardsToItems.get(item.id!) || [];
    const rewards = db_catalog_rewards.filter((db_reward) => rewardIds.includes(db_reward.id));

    const adminIds = map_adminsToItems.get(item.id!) || [];
    const admins = db_admins.filter((db_admin) => adminIds.includes(db_admin.id));

    const reitings = map_reitings.get(item.id!) || [];

    return {
      ...item,
      reitings,
      rewards,
      admins,
    };
  });

  return fullItems;
});
