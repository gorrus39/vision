import { image_referTypes, type Image } from "~/types/common"

export const getImagePath = (image: Image | undefined): string | undefined => {
  if (image == undefined) return undefined

  const isDirectLink = image.path?.startsWith("http")
  if (isDirectLink) {
    return image.path
  }

  // только добавлен на фронте. в блоб браузера
  const isFrontOnly = image.path?.startsWith("blob:http://")
  if (isFrontOnly) {
    return image.path
  }

  if (image_referTypes.includes(image.refer_type)) {
    return `/api/media-storage/${image.path}`
  }
}
