import { Bunner, Reward } from "~/types/catalog"

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean; data?: Bunner[] }> => {
  const db_items = await queries().catalogBunners.getAll()
  return { success: true, data: db_items }
})
