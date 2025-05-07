import type { BriefItemJson, Bunner, CatalogAdmin, CatalogItem, FullBriefJson, Lang, Reward } from "~/types/catalog"
import { z } from "zod"
import { tagsSchema, type Tag } from "~/types/catalog"

const randElement = <T>(arr: T[]): T => {
  const length = arr.length
  const index = Math.floor(Math.random() * length)
  if (index >= arr.length) console.error("randElement()", "arr.length", arr.length, "index", index)
  return arr[index]
}

const randBool = (): boolean => (Math.random() * 10 > 5 ? true : false)

const randNumber = ({ start, end }: { start: number; end: number }): number => {
  const amount = end - start
  if (amount <= 0) return 0

  const arr = Array(amount)
    .fill(0)
    .map((_el, index) => start + index)

  return randElement(arr)
}
function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0")
  const mm = String(date.getMonth() + 1).padStart(2, "0") // Январь — 0
  const yy = String(date.getFullYear()).slice(-2)

  return `${dd}.${mm}.${yy}`
}

// const viewLast3Reitings = (reitings: Reiting[]): string => {
//   if (reitings.length === 0) return "<b>-</b>"

//   const [firstValue, ...rest] = reitings.slice(0, 3).map((r) => String(r.value))

//   let result = `<b>${firstValue}</b>`
//   if (rest) result += `, ${rest.join(", ")}`
//   if (reitings.length > 3) result += "..."

//   return result
// }

const getTagsFromString = (string: string | undefined): Tag[] => {
  if (!string) return []

  const json = JSON.parse(string)
  const { success, data: tags, error } = z.array(tagsSchema).safeParse(json)
  if (success) return tags
  else return []
}

const convertTagsToString = (tags: Tag[]): string => JSON.stringify(tags)

///////////////////////////////////////////////////////////////////////////////////////////////

const putBlobReward = async (db_item: Reward, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100)
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "catalog-rewards",
  })
  return res.pathname
}

const getRewardImageUrl = (imgPath: string) => {
  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath

  // Формируем полный путь к изображению через API
  return `/api/blob/catalog-rewards/${imgPath}`
}

////////////////////////////////////////////////////////////////////////////////////////////////
const putBlobCatalogItem = async (db_item: CatalogItem, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100)
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "catalog-items",
  })
  return res.pathname
}

const getImg = (imgPath: string, prefix: string) => {
  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath

  // Формируем полный путь к изображению через API
  return `/api/blob/${prefix}/${imgPath}`
}

const getCatalogItemImageUrl = (imgPath: string) => {
  // plug
  if (!imgPath) return

  // из папки public для seed
  if (imgPath.startsWith("/")) return imgPath

  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath

  // Формируем полный путь к изображению через API
  return `/api/blob/catalog-items/${imgPath}`
}

////////////////////////////////////////////////////////////////////////////////////////////////

const getCatalogAdminImageUrl = (imgPath: string) => {
  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath

  // для прямых ссылок
  if (imgPath.includes("http")) return imgPath

  // фотки из seed
  if (imgPath.startsWith("/images/defaul")) return imgPath

  // Формируем полный путь к изображению через API
  return `/api/blob/catalog-admins/${imgPath}`
}
const putBlobCatalogAmin = async (db_item: CatalogAdmin, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100)
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "catalog-admins",
  })
  return res.pathname
}

const putBlobBunner = async (db_item: Bunner, file: File): Promise<string> => {
  const rand = Math.floor(Math.random() * 100)
  const res = await hubBlob().put(`${db_item.id}__${rand}__${file.name}`, file, {
    addRandomSuffix: false,
    prefix: "catalog-bunners",
  })
  return res.pathname
}

const getBunnerImageUrl = (imgPath: string) => {
  // для браузерных залитых на фронте
  if (imgPath.includes("blob")) return imgPath

  // фотки из seed
  if (imgPath.startsWith("/bunners")) return imgPath

  // Формируем полный путь к изображению через API
  return `/api/blob/catalog-bunners/${imgPath}`
}

const isValidBrief = (brief: FullBriefJson | string): { error?: string } => {
  const briefJson = typeof brief == "string" ? (JSON.parse(brief) as FullBriefJson) : (brief as FullBriefJson)

  const error = "At least one language and all score in brief must be fully completed"

  const values: {
    ru: boolean[]
    en: boolean[]
    cn: boolean[]
  } = {
    ru: [],
    en: [],
    cn: [],
  }

  for (const item of briefJson.items) {
    for (const [lang, value] of Object.entries(item.meaning)) {
      value !== undefined && value.length > 0 ? values[lang as Lang].push(true) : values[lang as Lang].push(false)
    }

    // if (item.score == undefined) return { error }
    // const someValuePresent = Object.values(item.meaning).some((value) => value !== undefined)
    // if (!someValuePresent) return { error }
  }

  const isValid = Object.values(values).some((arr) => arr.every((el) => el == true))

  return isValid ? {} : { error }
}

const hasBriefScoreDiffs = ({
  briefItemsBefore,
  briefItemsAfter: itemsAfter,
}: {
  briefItemsBefore: BriefItemJson[]
  briefItemsAfter: BriefItemJson[]
}): boolean => {
  for (let i = 0; i < briefItemsBefore.length; i++) {
    const itemBeforeScore = briefItemsBefore[i].score
    const itemAfterScore = itemsAfter[i].score
    if (itemBeforeScore !== itemAfterScore) {
      return true
    }
  }
  return false
}
const getBriefAgrigationValue = ({
  items,
  type = "regular",
}: {
  items: BriefItemJson[]
  type?: "seed" | "initial" | "regular"
}): { itemsAmount: number; sumValue: number | null } => {
  if (type == "initial") return { itemsAmount: 0, sumValue: null }
  if (type == "seed") return { itemsAmount: items.length, sumValue: randNumber({ start: 0, end: items.length * 10 }) }
  // debugger
  // // заглушка. непонятно почему так, вызывается из list.vue
  // if ("items" in items) {
  //   debugger
  //   items = items.items
  //   // return { itemsAmount: 0, sumValue: null }
  // }
  const { itemsAmount, sumValue } = items.reduce(
    (acc, item) => {
      acc.itemsAmount++
      acc.sumValue += item.score || 0
      return acc
    },
    { itemsAmount: 0, sumValue: 0 },
  )
  // debugger
  return { itemsAmount, sumValue }
}

export {
  isValidBrief,
  formatDate,
  hasBriefScoreDiffs,
  getBriefAgrigationValue,
  // viewLast3Reitings,
  getTagsFromString,
  convertTagsToString,
  putBlobReward,
  getRewardImageUrl,
  getCatalogAdminImageUrl,
  putBlobCatalogAmin,
  getCatalogItemImageUrl,
  putBlobCatalogItem,
  randElement,
  randNumber,
  getBunnerImageUrl,
  putBlobBunner,
  getImg,
  randBool,
}
