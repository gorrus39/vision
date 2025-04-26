import { deleteBlobItem } from "~/utils/blog"

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean }> => {
  const query = getQuery(event)
  const id = query.id ? +query.id : undefined

  if (!id) return { error: "when delete item - id: undefined" }
  await queries().catalogAdmin.delete(id)

  return { success: true }
})
