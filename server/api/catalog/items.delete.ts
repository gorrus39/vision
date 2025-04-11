import { deleteBlobItem } from "~/utils/blog";

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean }> => {
  const query = getQuery(event);
  const id = query.id ? +query.id : undefined;

  if (!id) return { error: "when delete item - id: undefined" };

  const [db_item] = await queries().catalogItem.delete(id);

  if (db_item.img_short_path?.startsWith("catalog-items")) await deleteBlobItem(db_item.img_short_path);
  if (db_item.img_large_path?.startsWith("catalog-items")) await deleteBlobItem(db_item.img_large_path);

  if (!db_item) return { error: "when delete item - db_item: undefined" };
  return { success: true };
});
