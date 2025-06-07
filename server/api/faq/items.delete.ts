const filePath = import.meta.url

export default eventHandler(async (event): Promise<{ error?: string }> => {
  const id = Number(getQuery(event).id)
  if (isNaN(id)) return { error: `${filePath} -> (isNaN(id))` }

  const [db_item_faq] = await queries().faqItems.getById(id)
  if (db_item_faq === undefined) return { error: `${filePath} -> (db_item_faq === undefined)` }

  const images = await queries().images.getById({ refer_id: db_item_faq.id, refer_type: "faq" })
  for (const { path, id } of images) {
    const isDirectLink = path.startsWith("http")
    if (!isDirectLink) await hubBlob().delete(path)
    await queries().images.delete(id)
  }

  await queries().faqItems.delete(db_item_faq.id)

  return {}
})
