import { putBlobReward } from "~/server/utils/helpers/catalog";
import { Reward, rewardSchema } from "~/types/catalog";

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean; data?: Reward }> => {
  const method = event.method;
  if (method == "POST") {
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
    if (!fileBuffer || !fileName || !fileType) return { error: "!fileBuffer || !fileName || !fileType" };

    const { success, data, error } = rewardSchema.safeParse(item);
    if (error) return { error: "undefined FormData" };

    let db_item = (await queries().catalogRewards.create(data))[0];
    const file = new File([fileBuffer], fileName, { type: fileType });
    const img_path = await putBlobReward(db_item, file);
    db_item = (await queries().catalogRewards.update(db_item.id, { ...db_item, img_path }))[0];

    return { success: true, data: db_item };
  }

  return { error: "unexpected method" };
});
