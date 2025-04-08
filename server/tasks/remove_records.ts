export default defineTask({
  meta: {
    name: "remove records",
  },
  async run() {
    const drizzle = queries().blogQueries;
    const allItems = await drizzle.getAll();
    const ids = allItems.map((item) => item.id);
    for (const id of ids) {
      await drizzle.delete(id);
    }

    const allCatalogItems = await queries().catalogItem.getAll();
    const catalogItemIds = allCatalogItems.map((item) => item.id);
    for (const id of catalogItemIds) {
      await queries().catalogItem.delete(id);
    }

    // const allRewards = await queries().catalogRewards.getAll();
    // const rewardIds = allRewards.map((item) => item.id);
    // for (const id of rewardIds) {
    //   await queries().catalogRewards.delete(id);
    // }

    // const allCatalogAdmins = await queries().catalogAdmin.getAll();
    // const catalogAdminIds = allCatalogAdmins.map((item) => item.id);
    // for (const id of catalogAdminIds) {
    //   await queries().catalogAdmin.delete(id);
    // }

    return { result: "success" };
    // throw new Error("Function not implemented.");
  },
});
