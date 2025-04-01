import { Reward } from "~/types/catalog";

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean; data?: Reward[] }> => {
  const db_items = await queries().catalogRewards.getAll();
  return { success: true, data: db_items };
});
