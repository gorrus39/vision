import { CatalogAdmin, CatalogItem } from "~/types/catalog"

import { readFile } from "fs/promises"
import path from "path"
import { faker } from "@faker-js/faker"
import { CatalogReward } from "~/types/catalog"
import { randBool, randElement, randNumber } from "~/utils/all"
import { Image } from "~/types/common"
import { createImageWithBlob } from "../helpers"

const seedAdmins = async () => {
  const db_ids = []
  const amountRecords = 10

  const path =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  const pathNames: string[] = Array(amountRecords).fill(path)

  for (let i = 0; i < pathNames.length; i++) {
    const item: CatalogAdmin = {
      name: `name-${i}, username-${i}`,
      description: `description-${i}, another-description-${i} `,
      // avatar_path: pathNames[i],
      images: [],
      link: pathNames[i],
    }

    const [db_item] = await queries().catalogAdmin.create(item)
    db_ids.push(db_item.id)
    const refer_type = "catalog-admin"

    const preImages: Image[] = Array(randNumber({ start: 1, end: 2 }))
      .fill(null)
      .map((i) => ({
        path,
        is_title: randBool(),
        refer_type,
      }))
    console.log("preImages", preImages)
    console.log("-----------------------")

    for (const preImage of preImages) {
      const data = preImage
      const refer_id = db_item.id

      await queries().images.create(data, refer_id, refer_type)
    }

    // db_ids.push(db_item.id)
  }

  return { result: "success", db_ids }
}

const seedRewards = async () => {
  const fileNames = ["1.png", "2.png", "1.svg", "2.svg"]
  const frontendFiles: File[] = []
  const db_ids = []

  for (const fileName of fileNames) {
    const filePath = path.join(process.cwd(), "public/images-test/catalog-rewards", fileName)
    const type_raw = fileName.split(".")[1]
    const type = type_raw == "png" ? "image/png" : "image/svg+xml"
    // Читаем файл
    const fileBuffer = await readFile(filePath)
    // Создаём Blob
    const blob = new Blob([fileBuffer], { type })
    // Преобразуем Blob в File
    const file = new File([blob], fileName, { type })

    frontendFiles.push(file)
  }

  const drizzle = queries().catalogRewards

  for (let i = 0; i < frontendFiles.length; i++) {
    const item: CatalogReward = {
      name: faker.company.name(),
      description: faker.lorem.lines({ min: 3, max: 10 }),
      images: [], // pathNames[i],
    }

    const [record] = await drizzle.create(item)
    db_ids.push(record.id)

    await createImageWithBlob(
      { is_title: false, refer_type: "catalog-reward", frontendFile: frontendFiles[i] },
      record.id,
      "catalog-reward",
    )
  }

  return { result: "success", db_ids }
}

const seedLinksToCatalogItem = async ({ item, linksAmount }: { item: CatalogItem; linksAmount: number }) => {
  if (!item.id) throw new Error("!item.id when seedLinksToCatalogItem = async")

  const drizzle = queries().catalogLinks
  const src_platforms = ["telegram", "web", "signal", "other"]

  for (let i = 0; i < linksAmount; i++) {
    await drizzle.create({
      title: faker.animal.bear(),
      description: faker.animal.bear(),
      catalog_item_id: item.id,
      link: "#",
      src_platform: randElement(src_platforms),
    })
  }
}

export { seedAdmins, seedRewards, seedLinksToCatalogItem }
