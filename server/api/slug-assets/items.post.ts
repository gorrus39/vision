import { SlugAsset, slugAssetSchema } from "~/types/common"

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean; data?: SlugAsset }> => {
  const formData = await readMultipartFormData(event)
  if (!formData) return { error: "undefined FormData" }
  debugger
  let item: SlugAsset | {} = {}

  let fileBuffer: Buffer<ArrayBufferLike> | null = null
  let fileName: string | null = null
  let fileType: string | null = null

  formData.forEach((part) => {
    if (part.name == "item") {
      item = JSON.parse(part.data.toString()) as SlugAsset
    } else if (part.name == "frontendFile") {
      fileBuffer = part.data
    } else if (part.name == "frontendFile.name") {
      fileName = part.data.toString()
    } else if (part.name == "frontendFile.type") {
      fileType = part.data.toString()
    }
  })

  const { success, data, error } = slugAssetSchema.safeParse(item)
  if (error) return { error: "undefined FormData" }

  let db_item = (await queries().slugAssets.create(data))[0]

  if (!fileBuffer || !fileName || !fileType) return { error: "!fileBuffer || !fileName || !fileType" }

  const file = new File([fileBuffer], fileName, { type: fileType })
  ////////////////////
  const { pathname: img_path } = await hubBlob().put(`${db_item.id}__${db_item.slug}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: `slug-assets`,
  })

  db_item = (await queries().slugAssets.update(db_item.id, { ...db_item, img_path }))[0]

  return { success: true, data: db_item }
})
