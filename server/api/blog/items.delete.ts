const filePath = import.meta.url

export default eventHandler(async (event): Promise<{ error?: string }> => {
  const id = Number(getQuery(event).id)
  if (isNaN(id)) return { error: `${filePath} -> (isNaN(id))` }

  const [db_item_blog] = await queries().blogItems.getById(id)
  if (db_item_blog === undefined) return { error: `${filePath} -> (db_item_blog === undefined)` }

  const images = await queries().images.getById({ refer_id: db_item_blog.id, refer_type: "blog" })
  for (const { path, id } of images) {
    const isDirectLink = path.startsWith("http")
    if (!isDirectLink) await hubBlob().delete(path)
    await queries().images.delete(id)
  }

  await queries().blogItems.delete(db_item_blog.id)

  return {}
})
