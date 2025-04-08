import { FullCatalogItem, fullCatalogItemSchema } from "~/types/catalog";

const ensureCorrespondingRewardsToItems = async (itemId: number, rewardIds: number[]) => {
  // то что лежит в бд
  const rewardsToItemsBefore = await queries().catalogRewardsToItems.getAllByCatalogItemId(itemId);

  // удаляем из бд, которых нету в свежих, уменьшаем список свежих наград, чтоб создать из остатка
  for (const db_r of rewardsToItemsBefore) {
    if (!rewardIds.includes(db_r.catalog_reward_id)) {
      await queries().catalogRewardsToItems.delete(db_r.id);
      rewardIds.splice(db_r.catalog_reward_id);
    }
  }

  // создаём
  for (const restId of rewardIds) {
    await queries().catalogRewardsToItems.create({ catalog_item_id: itemId, catalog_reward_id: restId });
  }
};

const ensureCorrespondingAdminsToItems = async (catalog_item_id: number, adminIds: number[]) => {
  // то что лежит в бд
  const adminsToItemsBefore = await queries().catalogAdminsToItems.getAllByCatalogItemId(catalog_item_id);

  // удаляем из бд, которых нету в свежих, уменьшаем список свежих наград, чтоб создать из остатка
  for (const db_r of adminsToItemsBefore) {
    if (!adminIds.includes(db_r.catalog_admin_id)) {
      await queries().catalogAdminsToItems.delete(db_r.id);
      adminIds.splice(db_r.catalog_admin_id);
    }
  }

  // создаём
  for (const catalog_admin_id of adminIds) {
    await queries().catalogAdminsToItems.create({ catalog_item_id, catalog_admin_id });
  }
};

export default eventHandler(async (event): Promise<{ success?: boolean; error?: string }> => {
  const formData = await readMultipartFormData(event);
  if (!formData) return { error: "undefined FormData 1" };

  let itemJson: FullCatalogItem | {} = {};

  formData.forEach((part) => {
    if (part.name == "itemJson") {
      itemJson = JSON.parse(part.data.toString()) as FullCatalogItem;
    }
  });

  const { success, data, error } = fullCatalogItemSchema.safeParse(itemJson);
  if (error) return { error: JSON.stringify(error.errors[0]) };
  if (!data.id) return { error: "error. has no id, when update item" };
  /////////////////////
  /////////////////////
  const [db_item] = await queries().catalogItem.getById(data.id);

  ensureCorrespondingRewardsToItems(
    db_item.id,
    data.rewards.map((reward) => reward.id!),
  );

  ensureCorrespondingAdminsToItems(
    db_item.id,
    data.admins.map((admin) => admin.id!),
  );

  const { rewards, admins, ...rest } = data;
  await queries().catalogItem.update(db_item.id, rest);

  return { success: true };
});
