import _ from "lodash"
import { defineStore } from "pinia"
import { z } from "zod"
import { bunnerSchema, fullCatalogItemSchema, type Bunner, type FullCatalogItem, type Reward } from "~/types/catalog"

// const getData = async (initialized: boolean): Promise<Bunner[]> => {
//   // debugger
//   if (initialized) {
//     const res = await $fetch<Bunner[]>("/api/catalog-bunners/items")
//     if (res.data) {
//       return res.data as Bunner[]
//     } else {
//       return []
//     }
//   } else {
//     const { data } = await useFetch<{
//       data?: Bunner[]
//       success?: boolean
//       error?: string
//     }>("/api/catalog-bunners/items")

//     return data.value?.data ?? []
//   }
// }

type BunnersResponse = {
  data?: Bunner[]
  success?: boolean
  error?: string
}

const getData = async (initialized: boolean): Promise<Bunner[]> => {
  const endpoint = "/api/catalog-bunners/items"

  if (initialized) {
    const res = await $fetch<BunnersResponse>(endpoint)
    return res.data ?? []
  } else {
    const { data } = await useFetch<BunnersResponse>(endpoint)
    return data.value?.data ?? []
  }
}

const useCatalogBunnersStore = defineStore("catalogStore", {
  state: () => ({
    items: [] as Bunner[],
    initialized: false,
  }),
  actions: {
    async init() {
      try {
        const data = await getData(this.initialized)
        // debugger

        const { data: items, success, error } = z.array(bunnerSchema).safeParse(data)
        if (!items) throw new Error("error, when parse catalog-bunners data from backend in store init", error)

        this.items = _.cloneDeep(items)
        this.initialized = true
      } catch (error) {
        console.log("init state catalog-bunners ERROR", error)
      }
    },
    async create_item_remote(state: Bunner) {
      const formData = new FormData()

      const { frontendFile, ...dataWithoutFile } = state

      formData.append("itemJson", JSON.stringify(dataWithoutFile))

      if (frontendFile) {
        ///
        formData.append("frontendFile", frontendFile)
        formData.append("frontendFile.name", frontendFile.name)
        formData.append("frontendFile.type", frontendFile.type)
        ///
      }

      try {
        const method = "POST"
        const { success, error } = await $fetch("/api/catalog-bunners/items", { method, body: formData })
        await this.init()

        return { success, error }
      } catch (error) {
        return { error }
      }
    },
    async delete_item_remote(itemId: number) {
      try {
        const { success, error } = await $fetch("/api/catalog-bunners/items", {
          method: "DELETE",
          query: { id: itemId },
        })
        await this.init()
        // if (success) {
        //   this.items = [...this.items.filter((i) => i.id !== itemId)]
        // }
        return { success, error }
      } catch (error) {
        return { error }
      }
    },
  },
  getters: {},
})

// Автоматический вызов init() при первом использовании стора
export const useInitializedCatalogBunnersStore = async () => {
  const store = useCatalogBunnersStore()
  if (!store.initialized) {
    await store.init()
  }
  return store
}
