export default defineTask({
  async run() {
    const ids = (await queries().faqItems.getAll()).map((i) => i.id)
    for (const id of ids) {
      await queries().faqItems.delete(id)
    }

    return { result: "success" }
  },
})
