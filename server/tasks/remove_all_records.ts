export default defineTask({
  meta: {
    name: "remove all records",
  },
  async run() {
    const blogItemIds = (await queries().blogItems.getAll()).map((item) => item.id)
    const catalogItemIds = (await queries().catalogItem.getAll()).map((item) => item.id)
    const rewardIds = (await queries().catalogRewards.getAll()).map((item) => item.id)
    const adminIds = (await queries().catalogAdmin.getAll()).map((item) => item.id)
    const linkIds = (await queries().catalogLinks.getAll()).map((item) => item.id)

    for (const id of blogItemIds) await queries().blogItems.delete(id)
    for (const id of rewardIds) await queries().catalogRewards.delete(id)
    for (const id of adminIds) await queries().catalogAdmin.delete(id)
    for (const id of linkIds) await queries().catalogLinks.delete(id)
    for (const id of catalogItemIds) {
      if (id) await queries().catalogItem.delete(id)
      else console.error("if (id) await queries().catalogItem.delete(id)")
    }

    return { result: "success" }
  },
})
