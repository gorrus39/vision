import { faker } from "@faker-js/faker"
import { seedAdmins, seedLinksToCatalogItem, seedRewards } from "../utils/seed"
import { fullBriefJsonSeed, Tag } from "~/types/catalog"
import { randBool, randElement, randNumber } from "~/utils/all"
import { Image } from "~/types/common"
import { imageDirectLiks } from "./seed-faq-items"

const randBoolean = () => Boolean(Math.round(Math.random()))

const makeTagsString = (): string[] => {
  const tags: Tag[][] = [
    ["kozmap", "oracle"],
    ["english", "russian", "chinese", "spanish", "french"],
    ["chat", "markets", "forums", "top sellers", "essentials", "others"],
  ]

  const setTags: Set<string> = new Set()

  if (Math.random() * 10 > 5) setTags.add(randElement(tags[0]))
  for (let i = 0; i < 4; i++) setTags.add(randElement(tags[1]))
  for (let i = 0; i < 5; i++) setTags.add(randElement(tags[2]))

  return [...setTags]
}

const makeImgShortPath = (): string => {
  const fileNames = ["1", "2", "3", "4", "5", "6"]
  const fullFileNames = fileNames.map((n) => `/images/default/catalog-item-img-short/${n}.png`)

  return randElement(fullFileNames)
}

const makeImgLargePath = (): string => {
  const fileNames = ["1", "2", "3", "4", "5", "6"]
  const fullFileNames = fileNames.map((n) => `/images-test/${n}.jpeg`)

  return randElement(fullFileNames)
}

const makeDescriptionShort = () => {
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure."

  return JSON.stringify({ ru: "", cn: "", en: text })
}

const makeDescriptionLarge = () => {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}

const makeRules = () => {
  return "<p><strong>Lorem ipsum dolor sit ame</strong><br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br><br><strong>Lorem ipsum dolor sit ame</strong><br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br><br><strong>Lorem ipsum dolor sit ame</strong><br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br><br><strong>Lorem ipsum dolor sit ame</strong><br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br><br><strong>Lorem ipsum dolor sit ame</strong><br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"
}

export default defineTask({
  async run(event) {
    const drizzle = queries()

    const catalogItemAmount = 30

    const { db_ids: adminIds } = await seedAdmins()
    const { db_ids: rewardIds } = await seedRewards()

    for (let i = 0; i < catalogItemAmount; i++) {
      const brief = fullBriefJsonSeed()
      const catalogItem = await drizzle.catalogItem.create({
        title: faker.company.name(),
        tags: makeTagsString(),
        description_short: makeDescriptionShort(),
        description_large: makeDescriptionLarge(),
        rules: makeRules(),
        brief,
        is_top: randBoolean(),
      })
      const catalog_item_id = catalogItem.id!

      // add admin ids
      const catalogAdminsToItemsAmount = randElement([1, 2, 3, 4, 5])
      for (let i = 0; i < catalogAdminsToItemsAmount; i++) {
        await drizzle.catalogAdminsToItems.create({
          catalog_admin_id: randElement(adminIds),
          catalog_item_id,
        })
      }

      // add reward ids
      const caralogRewardsToItem = randElement([0, 1, 2, 3, 4, 5, 6])
      for (let i = 0; i < caralogRewardsToItem; i++) {
        await drizzle.catalogRewardsToItems.create({
          catalog_item_id,
          catalog_reward_id: randElement(rewardIds),
        })
      }

      const preImages: Image[] = Array(randNumber({ start: 0, end: 4 }))
        .fill(null)
        .map((i) => ({
          path: randElement(imageDirectLiks),
          is_title: randBool(),
          refer_type: "catalog-item",
        }))

      for (const preImage of preImages) {
        const data = preImage
        const refer_id = catalog_item_id
        const refer_type = "catalog-item"

        await queries().images.create(data, refer_id, refer_type)
      }

      await seedLinksToCatalogItem({ item: catalogItem, linksAmount: 10 })
    }
    return { result: "success" }
  },
})
