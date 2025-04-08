import { CatalogAdmin, Reward } from "~/types/catalog";

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean; data?: CatalogAdmin[] }> => {
  const db_items = await queries().catalogAdmin.getAll();
  return { success: true, data: db_items };
});
