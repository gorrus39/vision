import { CatalogLink, FullCatalogItem, fullCatalogItemSchema, Reiting } from "~/types/catalog";

const createCorrespondingRewardsToItems = async (itemId: number, rewardIds: number[]) => {
  for (const rewardId of rewardIds) {
    await queries().catalogRewardsToItems.create({ catalog_item_id: itemId, catalog_reward_id: rewardId });
  }
};

const createCorrespondingAdminsToItems = async (itemId: number, adminIds: number[]) => {
  for (const adminId of adminIds) {
    await queries().catalogAdminsToItems.create({ catalog_item_id: itemId, catalog_admin_id: adminId });
  }
};

const createCorrespondingReitings = async (catalog_item_id: number, reitings: Reiting[]) => {
  for (const reiteing of reitings) {
    const value = reiteing.value;
    await queries().reitings.create({ catalog_item_id, value });
  }
};

const createCorrespondingLinks = async (catalog_item_id: number, links: CatalogLink[]) => {
  for (const link of links) {
    await queries().catalogLinks.create({ ...link, catalog_item_id });
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

  const [db_item] = await queries().catalogItem.create(data);

  createCorrespondingLinks(db_item.id, data.links);

  createCorrespondingReitings(db_item.id, data.reitings);

  createCorrespondingRewardsToItems(
    db_item.id,
    data.rewards.map((reward) => reward.id!),
  );

  createCorrespondingAdminsToItems(
    db_item.id,
    data.admins.map((admin) => admin.id!),
  );

  return { success: true };
});
