import { CatalogAdmin, catalogAdminSchema } from "~/types/catalog";
import { putBlobCatalogAmin } from "~/utils/all";
import { deleteBlobItem } from "~/utils/blog";

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean; data?: CatalogAdmin }> => {
  const formData = await readMultipartFormData(event);
  if (!formData) return { error: "undefined FormData" };

  let item: CatalogAdmin | {} = {};

  let fileBuffer: Buffer<ArrayBufferLike> | null = null;
  let fileName: string | null = null;
  let fileType: string | null = null;

  formData.forEach((part) => {
    if (part.name == "item") {
      item = JSON.parse(part.data.toString()) as CatalogAdmin;
    } else if (part.name == "frontendFile") {
      fileBuffer = part.data;
    } else if (part.name == "frontendFile.name") {
      fileName = part.data.toString();
    } else if (part.name == "frontendFile.type") {
      fileType = part.data.toString();
    }
  });

  const { success, data, error } = catalogAdminSchema.safeParse(item);
  if (error) return { error: "undefined FormData" };

  let db_item;
  if (data.id) {
    // update
    db_item = (await queries().catalogAdmin.getById(data.id))[0];

    const img_path_changed = db_item.avatar_path !== data.avatar_path;
    let avatar_path;
    if (img_path_changed) {
      if (!fileBuffer || !fileName || !fileType) return { error: "!fileBuffer || !fileName || !fileType" };

      await deleteBlobItem(db_item.avatar_path);
      const file = new File([fileBuffer], fileName, { type: fileType });
      avatar_path = await putBlobCatalogAmin(db_item, file);
    } else {
      avatar_path = data.avatar_path;
    }

    db_item = (await queries().catalogAdmin.update(db_item.id, { ...data, avatar_path: avatar_path }))[0];
    return { success: true, data: db_item };
  } else {
    // create
    db_item = (await queries().catalogAdmin.create(data))[0];

    if (!fileBuffer || !fileName || !fileType) return { error: "!fileBuffer || !fileName || !fileType" };

    const file = new File([fileBuffer], fileName, { type: fileType });
    const avatar_path = await putBlobCatalogAmin(db_item, file);

    db_item = (await queries().catalogAdmin.update(db_item.id, { ...db_item, avatar_path }))[0];
    return { success: true, data: db_item };
  }
});
