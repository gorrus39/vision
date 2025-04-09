import { Reward, rewardSchema } from "~/types/catalog";
import { putBlobReward } from "~/utils/all";
import { deleteBlobItem } from "~/utils/blog";

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean; data?: Reward }> => {
  const formData = await readMultipartFormData(event);
  if (!formData) return { error: "undefined FormData" };

  let item: Reward | {} = {};

  let fileBuffer: Buffer<ArrayBufferLike> | null = null;
  let fileName: string | null = null;
  let fileType: string | null = null;

  formData.forEach((part) => {
    if (part.name == "item") {
      item = JSON.parse(part.data.toString()) as Reward;
    } else if (part.name == "frontendFile") {
      fileBuffer = part.data;
    } else if (part.name == "frontendFile.name") {
      fileName = part.data.toString();
    } else if (part.name == "frontendFile.type") {
      fileType = part.data.toString();
    }
  });

  const { success, data, error } = rewardSchema.safeParse(item);
  if (error) return { error: "undefined FormData" };

  let db_item;
  if (data.id) {
    // update
    db_item = (await queries().catalogRewards.getById(data.id))[0];

    const img_path_changed = db_item.img_path !== data.img_path;
    let img_path;
    if (img_path_changed) {
      if (!fileBuffer || !fileName || !fileType) return { error: "!fileBuffer || !fileName || !fileType" };

      await deleteBlobItem(db_item.img_path);
      const file = new File([fileBuffer], fileName, { type: fileType });
      img_path = await putBlobReward(db_item, file);
    } else {
      img_path = data.img_path;
    }

    db_item = (await queries().catalogRewards.update(db_item.id, { ...data, img_path }))[0];
    return { success: true, data: db_item };
  } else {
    // create
    db_item = (await queries().catalogRewards.create(data))[0];

    if (!fileBuffer || !fileName || !fileType) return { error: "!fileBuffer || !fileName || !fileType" };

    const file = new File([fileBuffer], fileName, { type: fileType });
    const img_path = await putBlobReward(db_item, file);

    db_item = (await queries().catalogRewards.update(db_item.id, { ...db_item, img_path }))[0];
    return { success: true, data: db_item };
  }
});
