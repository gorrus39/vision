import { deleteBlobItem } from "~/utils/blog";

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean }> => {
  const query = getQuery(event);
  const id = query.id ? +query.id : undefined;

  if (!id) return { error: "when delete item - id: undefined" };

  const db_item = (await queries().catalogRewards.getById(id))[0];
  if (!db_item) return { error: "when delete item - db_item: undefined" };

  await deleteBlobItem(db_item.img_path);
  await queries().catalogRewards.delete(id);

  return { success: true };
});
