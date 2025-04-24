import { CatalogAdmin, CatalogItem } from "~/types/catalog"

import { readFile } from "fs/promises"
import path from "path"
import { faker } from "@faker-js/faker"
import { Reward } from "~/types/catalog"
import { randElement } from "~/utils/all"

const seedAdmins = async () => {
  const amountRecords = 10

  const path =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  const pathNames: string[] = Array(amountRecords).fill(path)

  const drizzle = queries().catalogAdmin

  const db_ids: number[] = []

  for (let i = 0; i < pathNames.length; i++) {
    const item: CatalogAdmin = {
      name: `name-${i}, username-${i}`,
      description: `description-${i}, another-description-${i} `,
      avatar_path: pathNames[i],
      link: pathNames[i],
    }

    const [db_item] = await drizzle.create(item)

    db_ids.push(db_item.id)
  }

  return { result: "success", db_ids }
}

const seedRewards = async () => {
  const fileNames = ["1.png", "2.png", "1.svg", "2.svg"]

  const pathNames: string[] = []
  const db_ids: number[] = []

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

    // Отправляем в hubBlob
    const res = await hubBlob().put(`test-${fileName}`, file, {
      addRandomSuffix: false,
      prefix: "test-rewards",
    })
    pathNames.push(res.pathname)
  }

  const drizzle = queries().catalogRewards

  for (let i = 0; i < pathNames.length; i++) {
    const item: Reward = {
      name: faker.company.name(),
      description: faker.lorem.lines({ min: 3, max: 10 }),
      img_path: pathNames[i],
    }

    const [item_id] = await drizzle.create(item)
    db_ids.push(item_id.id)
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
