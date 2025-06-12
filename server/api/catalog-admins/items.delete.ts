const filePath = import.meta.url

export default eventHandler(async (event): Promise<{ error?: string }> => {
  const id = Number(getQuery(event).id)
  if (isNaN(id)) return { error: `${filePath} -> (isNaN(id))` }

  const [db_item_catalog_admin] = await queries().catalogAdmin.getById(id)
  if (db_item_catalog_admin === undefined) return { error: `${filePath} -> (db_item_catalog_admin === undefined)` }

  const images = await queries().images.getById({ refer_id: db_item_catalog_admin.id, refer_type: "catalog-admin" })
  for (const { path, id } of images) {
    const isDirectLink = path.startsWith("http")
    if (!isDirectLink) await hubBlob().delete(path)
    await queries().images.delete(id)
  }

  await queries().catalogAdmin.delete(db_item_catalog_admin.id)

  return {}
})
