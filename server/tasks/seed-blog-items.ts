import { BlogItem } from "~/types/blog"
import { readFile } from "fs/promises"
import path from "path"
import { faker } from "@faker-js/faker"
import { randBool, randElement, randNumber } from "~/utils/all"
import { Image } from "~/types/common"
import { imageDirectLiks } from "./seed-faq-items"

const getPriority = (): "High" | "Low" => (Math.random() < 0.5 ? "High" : "Low")

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    console.log("Running DB seed task...")

    const itemsAmount = 60
    // const fileNames = [1, 2, 3, 4, 5, 6].map((name) => `${name}.jpeg`)
    // const pathNames: string[] = []

    // for (const fileName of fileNames) {
    // const filePath = path.join(process.cwd(), "public/images-test", fileName)

    // Читаем файл
    // const fileBuffer = await readFile(filePath)

    // Создаём Blob
    // const blob = new Blob([fileBuffer], { type: "image/jpeg" })

    // Преобразуем Blob в File
    // const file = new File([blob], fileName, { type: "image/jpeg" })

    // Отправляем в hubBlob
    //   const res = await hubBlob().put(`test-${fileName}`, file, {
    //     addRandomSuffix: false,
    //     prefix: "blog-items",
    //   })
    //   pathNames.push(res.pathname)
    // }

    const drizzle = queries().blogItems

    const getAnyIndex = (arr: any[]) => {
      return Math.floor(Math.random() * arr.length)
    }

    for (let i = 0; i < itemsAmount; i++) {
      const images: Image[] = [] //Array(5).fill(null)

      // if (i % 2 == 0) images[0] = pathNames[getAnyIndex(pathNames)]

      const item: BlogItem = {
        published_at: new Date(),
        category: `Category ${i + 1}`,
        title: faker.company.name(), //`Main TITLE ${i + 1}`,
        sub_title: `Sub Title Sub Title ${i + 1}`,
        text: faker.lorem.lines({ min: 20, max: 100 }), //"text Text ".repeat(10),
        priority: getPriority(),
        order_index: i + 1,
        images,
        lang: randElement(["en", "ru", "cn"]),
      }

      const [recordBlogItem] = await drizzle.create(item)

      const preImages: Image[] = Array(randNumber({ start: 0, end: 3 }))
        .fill(null)
        .map((i) => ({
          path: randElement(imageDirectLiks),
          is_title: randBool(),
          refer_type: "blog",
        }))

      for (const preImage of preImages) {
        const data = preImage
        const refer_id = recordBlogItem.id
        const refer_type = "blog"

        await queries().images.create(data, refer_id, refer_type)
      }
    }

    return { result: "success" }
  },
})
