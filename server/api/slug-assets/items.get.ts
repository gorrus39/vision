import { SlugAsset } from "~/types/common"

export default eventHandler(async (): Promise<Omit<SlugAsset, "frontendFile">[]> => {
  return await queries().slugAssets.getAll()
})
