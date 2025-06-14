import { deleteBlobItem } from "~/utils/blog"

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean }> => {
  const query = getQuery(event)
  const id = query.id ? +query.id : undefined

  if (!id) return { error: "when delete item - id: undefined" }

  const db_item = await queries().catalogItem.delete(id)

  const images = await queries().images.getByIds({
    refer_ids: [db_item.id!],
    refer_type: "catalog-item",
  })
  for (const { path, id } of images) {
    const isDirectLink = path.startsWith("http")
    if (!isDirectLink) await hubBlob().delete(path)
    await queries().images.delete(id)
  }

  if (!db_item) return { error: "when delete item - db_item: undefined" }
  return { success: true }
})
