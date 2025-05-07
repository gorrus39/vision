const filePath = import.meta.url

export default eventHandler(async (event): Promise<{ error?: string }> => {
  const id = Number(getQuery(event).id)
  if (isNaN(id)) return { error: `${filePath} -> (isNaN(id))` }

  const db_item_faq = await queries().faqItems.getByIdWithImages(id)
  if (db_item_faq === undefined) return { error: `${filePath} -> (db_item_faq === undefined)` }

  for (const { path_server } of db_item_faq.images) {
    const isDirectLink = path_server.startsWith("http")
    if (!isDirectLink) await hubBlob().delete(path_server)
  }
  await queries().faqItems.delete(db_item_faq.id)

  return {}
})
