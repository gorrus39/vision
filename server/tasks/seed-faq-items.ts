import { faker } from "@faker-js/faker"
import { Lang } from "~/types/catalog"
import { FaqImage } from "~/types/faq"
import { randBool, randElement, randNumber } from "~/utils/all"

const imageDirectLiks = [
  "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=1800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/file-1707883121023-8e3502977149image?w=416&dpr=2&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 100w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 200w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 300w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 400w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 500w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 600w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 700w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 800w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 900w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 1000w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 1200w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 1400w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 1600w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=1800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 1800w, https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D 2000w",
  "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 100w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 200w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 300w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 400w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 500w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 600w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 700w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 800w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 900w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 1000w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 1200w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 1400w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 1600w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 1800w, https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D 2000w",
  "https://media.istockphoto.com/id/2151129875/photo/casual-teens-group-portrait.webp?a=1&b=1&s=612x612&w=0&k=20&c=ynpyawIt9o6SDNEv3xmg1Fb6Cc4N1ypJAzxZKPxsB5k=",
  "https://media.istockphoto.com/id/2054515915/photo/satisfaction-document-checklist-database-contract-checkbox-insurance-manager-technology.webp?a=1&b=1&s=612x612&w=0&k=20&c=LaVv9xEoofUgpUX-tJxX1d5y59W3jBRzr8Dz2kZ3_dE=",
  "https://media.istockphoto.com/id/2169335248/photo/a-handwritten-business-strategy-flow-chart-on-blackboard-conceptual-hand-drawn-innovation.webp?a=1&b=1&s=612x612&w=0&k=20&c=OEYNp9b0YPOXFuHqAzrYl0hPVU1mpxD9VfukgZKUWJk=",
]

const langs: Lang[] = ["en", "ru", "cn"]
const priorities: ("High" | "Low")[] = ["High", "Low"]

export default defineTask({
  async run(event) {
    const faqItemsAmount = 60
    const maxImagesAmountByItem = 5

    for (const i of Array(faqItemsAmount)) {
      const [db_faq_item] = await queries().faqItems.create({
        category: faker.word.adjective(),
        title: faker.commerce.productAdjective(),
        text: faker.lorem.paragraphs(),
        priority: randElement(priorities),
        order_index: 0,
        lang: randElement(langs),
        images: [],
      })

      const images: FaqImage[] = Array(randNumber({ start: 0, end: maxImagesAmountByItem }))
        .fill(null)
        .map((i) => ({
          img_path: randElement(imageDirectLiks),
          is_title: randBool(),
        }))

      for (const imageJson of images) {
        await queries().faqImage.create(imageJson, db_faq_item.id)
      }
    }

    return { result: "success" }
  },
})
