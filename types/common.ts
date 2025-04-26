import z from "zod"

export const slugAssetSchema = z.object({
  id: z.number().optional(),
  slug: z.string(),
  title: z.string().optional().nullable(),
  img_path: z.string().optional().nullable(),
  text_content: z.string().optional().nullable(),

  frontendFile: z.instanceof(File).optional(),
})

export type SlugAsset = z.infer<typeof slugAssetSchema>
