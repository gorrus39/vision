import { bunnerSchema, Bunner, Reward } from "~/types/catalog"
import { putBlobBunner } from "~/utils/all"

export default eventHandler(async (event): Promise<{ error?: string; success?: boolean; data?: Bunner }> => {
  const formData = await readMultipartFormData(event)
  if (!formData) return { error: "undefined FormData" }

  let item: Bunner | {} = {}

  let fileBuffer: Buffer<ArrayBufferLike> | null = null
  let fileName: string | null = null
  let fileType: string | null = null

  formData.forEach((part) => {
    if (part.name == "itemJson") {
      item = JSON.parse(part.data.toString()) as Reward
    } else if (part.name == "frontendFile") {
      fileBuffer = part.data
    } else if (part.name == "frontendFile.name") {
      fileName = part.data.toString()
    } else if (part.name == "frontendFile.type") {
      fileType = part.data.toString()
    }
  })

  if (!item) throw Error("!item - when post catalog-bunner")

  const { success, data, error } = bunnerSchema.safeParse(item)
  if (error) return { error: "undefined FormData" }

  let [db_item] = await queries().catalogBunners.create(data)

  if (!fileBuffer || !fileName || !fileType) return { error: "!fileBuffer || !fileName || !fileType" }

  const file = new File([fileBuffer], fileName, { type: fileType })
  const img_path = await putBlobBunner(db_item, file)

  db_item = (await queries().catalogBunners.update(db_item.id, { ...db_item, img_path }))[0]
  return { success: true, data: db_item }
})
