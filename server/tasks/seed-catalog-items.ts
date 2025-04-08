import { faker } from "@faker-js/faker";

const randElement = (arr: any[]): number => {
  const length = arr.length;
  const index = Math.floor(Math.random() * length);
  if (index >= arr.length) console.error("randElement()", "arr.length", arr.length, "index", index);
  return arr[index];
};

export default defineTask({
  async run(event) {
    const drizzle = queries();

    const catalogItemAmount = 3;
    const catalogAdminsToItemsAmount = 2;
    const caralogRewardsToItem = 4;

    const adminIds = (await queries().catalogAdmin.getAll()).map((item) => item.id);
    if (adminIds.length === 0) return { result: "fail", message: "has no one catalog-admin" };

    const rewardIds = (await queries().catalogRewards.getAll()).map((reward) => reward.id);

    for (let i = 0; i < catalogItemAmount; i++) {
      const [catalogItem] = await drizzle.catalogItem.create({ title: faker.company.name() });

      for (let j = 0; j < catalogAdminsToItemsAmount; j++) {
        await drizzle.catalogAdminsToItems.create({
          catalog_admin_id: randElement(adminIds),
          catalog_item_id: catalogItem.id,
        });
      }

      for (let z = 0; z < caralogRewardsToItem; z++) {
        await drizzle.catalogRewardsToItems.create({
          catalog_item_id: catalogItem.id,
          catalog_reward_id: randElement(rewardIds),
        });
      }
    }
    return { result: "success" };
  },
});
