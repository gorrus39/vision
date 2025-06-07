import { Image, ImageReferType } from "~/types/common"

const createImageWithBlob = async (
  imageAfter: Image & { frontendFile: File },
  refer_id: number,
  refer_type: ImageReferType,
) => {
  const { pathname } = await hubBlob().put(`refer_id-${refer_id}__${imageAfter.fileName}`, imageAfter.frontendFile, {
    prefix: refer_type,
  })
  await queries().images.create({ ...imageAfter, path: pathname }, refer_id, refer_type)
}

// `const updateImageWithBlob = async (imageBefore: Image, imageAfter: Image & { frontendFile: File }) => {
//   // изменения могут быть самой картинки или поля is_title
//   const newDirectLink = imageAfter.pathTemp?.startsWith("http")
//   const wasDirectLink = imageBefore.pathTemp?.startsWith("http")

//   if (!wasDirectLink) await hubBlob().delete(imageBefore.path!)

//   if (newDirectLink) {
//     queries().images.update(imageAfter.id!, imageAfter)
//   } else {
//     const { pathname } = await hubBlob().put(
//       `refer_id-${imageBefore.refer_id}__${imageAfter.fileName}`,
//       imageAfter.frontendFile,
//       {
//         prefix: imageBefore.refer_type,
//       },
//     )
//     queries().images.update(imageAfter.id!, { ...imageAfter, path: pathname })
//   }
// }

const updateImage = async (imageBefore: Image, imageAfter: Image) => {
  // меняться может
  // - is_title
  // - картинка

  let is_title = imageBefore.is_title
  let path = imageBefore.path

  // const newIsDirectLink = imageAfter.pathTemp?.startsWith("http")
  // const oldWasDirectLink = imageBefore.pathTemp?.startsWith("http")

  // const pathChanged = imageBefore.pathTemp !== imageAfter.pathTemp
  // const isTitleChanged = imageBefore.is_title !== imageAfter.is_title

  // изменение is_title
  if (imageBefore.is_title !== imageAfter.is_title) is_title = imageAfter.is_title

  // изменение картинки (прямая ссылка или из hubBlob)
  // if (imageAfter.path !== imageBefore.path && imageAfter.frontendFile) {
  // картинка изменена
  // }

  // // 🔴 2. Путь меняется: удаляем старый blob, если нужно
  // if (!oldWasDirectLink && imageBefore.path) {
  //   await hubBlob().delete(imageBefore.path)
  // }

  // // 🌐 3. Новый путь — внешняя ссылка (ничего не грузим)
  // if (newIsDirectLink) {
  //   await queries().images.update(imageAfter.id!, imageAfter)
  // } else {
  //   // 📤 4. Загружаем новый файл в blob и сохраняем путь
  //   const { pathname } = await hubBlob().put(
  //     `refer_id-${imageBefore.refer_id}__${imageAfter.fileName}`,
  //     imageAfter.frontendFile!,
  //     {
  //       prefix: imageBefore.refer_type,
  //     },
  //   )

  //   await queries().images.update(imageAfter.id!, {
  //     ...imageAfter,
  //     path: pathname,
  //   })
  // }

  await queries().images.update(imageAfter.id!, {
    ...imageAfter,
    path,
    is_title,
  })
}

type Props = {
  imagesBefore: Image[]
  imagesAfter: Image[]
  refer_id: number
  refer_type: ImageReferType
}

export const handleImages = async ({ imagesBefore, imagesAfter, refer_id, refer_type }: Props) => {
  const afterById = new Map(imagesAfter.filter((i) => i.id).map((i) => [i.id!, i]))

  const newImages = imagesAfter.filter((img) => !img.id)

  const deletedImages = imagesBefore.filter((imgBefore) => !afterById.has(imgBefore.id!))

  const updatedImages = imagesBefore
    .map((imgBefore) => {
      const imgAfter = afterById.get(imgBefore.id!)
      if (!imgAfter) return null

      const isTitleChanged = imgBefore.is_title !== imgAfter.is_title
      const isPathChanged = imgBefore.path !== imgAfter.path

      return isTitleChanged || isPathChanged ? ([imgBefore, imgAfter] as const) : null
    })
    .filter(Boolean) as [Image, Image][]

  // Создание новых изображений
  for (const image of newImages) {
    const frontendFile = image.frontendFile!
    await createImageWithBlob({ ...image, frontendFile }, refer_id, refer_type)
  }

  // Обновление существующих
  for (const [, imgAfter] of updatedImages) {
    await queries().images.update(imgAfter.id!, imgAfter)
  }

  // Удаление
  for (const img of deletedImages) {
    if (img.path && !img.path.startsWith("http")) {
      await hubBlob().delete(img.path)
    }
    await queries().images.delete(img.id!)
  }
}
