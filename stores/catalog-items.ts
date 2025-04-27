import _ from "lodash"
import { defineStore } from "pinia"
import { z } from "zod"
import { fullCatalogItemSchema, type FullCatalogItem, type Reward } from "~/types/catalog"

const getData = async (initialized: boolean): Promise<FullCatalogItem[]> => {
  if (initialized) {
    return await $fetch<FullCatalogItem[]>("/api/catalog/items")
  } else {
    const { data } = await useAsyncData<FullCatalogItem[]>("catalog-items", () => $fetch("/api/catalog/items"))
    return data.value || []
  }
}

const useCatalogItemsStore = defineStore("catalogItemsStore", {
  state: () => ({
    items: [] as FullCatalogItem[], //_.cloneDeep(test_items), // изначальные, для отмены превью
    // items: [] as FullCatalogItem[], //_.cloneDeep(test_items), // изначальные, для отмены превью
    initialized: false,
  }),
  actions: {
    async init() {
      try {
        const data = await getData(this.initialized)
        // const { data } = await useAsyncData(() => $fetch("/api/catalog/items"));
        const { data: items, success, error } = z.array(fullCatalogItemSchema).safeParse(data)

        if (!items) throw new Error("error, when parse catalog-items data from backend in store init", error)

        this.items = _.cloneDeep(items)
        this.initialized = true
      } catch (error) {
        console.log("init state catalog-items ERROR", error)
      }
    },
    async create_or_update_item_remote(state: FullCatalogItem) {
      const formData = new FormData()

      const { frontendFileLarge, frontendFileShort, ...dataWithoutFile } = state

      formData.append("itemJson", JSON.stringify(dataWithoutFile))

      if (frontendFileShort) {
        ///
        formData.append("frontendFileShort", frontendFileShort)
        formData.append("frontendFileShort.name", frontendFileShort.name)
        formData.append("frontendFileShort.type", frontendFileShort.type)
        ///
      }

      if (frontendFileLarge) {
        ///
        formData.append("frontendFileLarge", frontendFileLarge)
        formData.append("frontendFileLarge.name", frontendFileLarge.name)
        formData.append("frontendFileLarge.type", frontendFileLarge.type)
        ///
      }

      try {
        const method = state.id ? "PUT" : "POST"
        const { success, error } = await $fetch("/api/catalog/items", { method, body: formData })
        await this.init()

        return { success, error }
      } catch (error) {
        return { error }
      }
    },
    async delete_item_remote(itemId: number) {
      try {
        const { success, error } = await $fetch("/api/catalog/items", { method: "DELETE", query: { id: itemId } })
        await this.init()

        return { success, error }
      } catch (error) {
        return { error }
      }
    },
  },
  getters: {
    topProjects(): FullCatalogItem[] {
      return this.items.filter((i) => i.is_top)
    },
  },
})

// Автоматический вызов init() при первом использовании стора
export const useInitializedCatalogItemsStore = async () => {
  const store = useCatalogItemsStore()
  if (!store.initialized) {
    await store.init()
  }
  return store
}
