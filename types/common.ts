import z from "zod"

export const imageReferTypeScheme = z.enum(["faq", "blog", "slug-asset", "catalog-admin", "catalog-reward"])

export const imageSchema = z.object({
  id: z.number().optional(),
  refer_id: z.number().optional(),
  refer_type: imageReferTypeScheme,

  path: z.string().optional(),
  is_title: z.boolean(),

  frontendFile: z.instanceof(File).nullable().optional(),
  fileName: z.string().optional(),
  fileType: z.string().optional(),
})

export const slugAssetSchema = z.object({
  id: z.number().optional(),
  slug: z.string(),
  title: z.string().optional().nullable(),
  // img_path: z.string().optional().nullable(),
  text_content: z.string().optional().nullable(),

  images: z.array(imageSchema),
  // frontendFile: z.instanceof(File).optional(),
})

export type Image = z.infer<typeof imageSchema>
export type ImageReferType = z.infer<typeof imageReferTypeScheme>
export type SlugAsset = z.infer<typeof slugAssetSchema>
