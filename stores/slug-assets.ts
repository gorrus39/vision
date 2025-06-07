import { cloneDeep } from "lodash"
import { defineStore } from "pinia"
import type { SlugAsset } from "~/types/common"

export const useSlugAssetsStore = defineStore("slugAssets", {
  state: () => ({
    data: [] as SlugAsset[],
    initialized: false,
  }),

  actions: {
    async initData() {
      if (this.initialized) return

      await this.refreshData()
      this.initialized = true
    },

    async refreshData() {
      try {
        const data = await $fetch<SlugAsset[]>("/api/slug-assets/items")
        this.data = cloneDeep(data)
      } catch (e) {
        console.error("Failed to fetch FAQ items:", e)
      }
    },

    async createItem(formData: FormData): Promise<{ error?: string }> {
      try {
        const { error } = await $fetch("/api/slug-assets/items", { method: "POST", body: formData })
        await this.refreshData()

        return { error }
      } catch (error) {
        return { error: String(error) }
      }
    },
    // async deleteItem(id: number): Promise<{ error?: string }> {
    //   try {
    //     const { error } = await $fetch("/api/slug-assets/items", { method: "DELETE", query: { id } })
    //     await this.refreshData()

    //     return { error }
    //   } catch (error) {
    //     return { error: String(error) }
    //   }
    // },
    async updateItem(formData: FormData, id: number): Promise<{ error?: string }> {
      try {
        const { error } = await $fetch("/api/slug-assets/items", { method: "PUT", body: formData, query: { id } })
        const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
        await sleep(1000) // не успевает blob storage

        await this.refreshData()

        return { error }
      } catch (error) {
        return { error: String(error) }
      }
    },
  },
  getters: {
    homeAlwaysRelevant(): SlugAsset[] {
      return this.data.filter((i) => i.slug === "home__always-relevant")
    },
  },
})
