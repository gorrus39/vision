import { SlugAsset, slugAssetSchema } from "~/types/common"
import { deleteBlobItem } from "~/utils/blog"

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

  if (!data.id) return { error: "id must present" }

  let db_item = (await queries().slugAssets.getById(data.id))[0]

  const img_path_changed = db_item.img_path !== data.img_path
  let img_path
  if (img_path_changed) {
    if (!fileBuffer || !fileName || !fileType || db_item.img_path == null)
      return { error: "!fileBuffer || !fileName || !fileType" }

    try {
      await hubBlob().del(db_item.img_path)
    } catch (error) {}

    const file = new File([fileBuffer], fileName, { type: fileType })
    const { pathname } = await hubBlob().put(`${db_item.id}__${db_item.slug}__${file.name}`, file, {
      addRandomSuffix: false,
      prefix: `slug-assets`,
    })
    img_path = pathname
  } else {
    img_path = data.img_path
  }

  db_item = (await queries().slugAssets.update(db_item.id, { ...data, img_path }))[0]

  return { success: true, data: db_item }
})
