import { defineStore } from "pinia"
import { cloneDeep } from "lodash"
import type { CatalogReward } from "~/types/catalog"

export const useCatalogRewardsStore = defineStore("catalogRewardsStore", {
  state: () => ({
    initialData: [] as CatalogReward[],
    data: [] as CatalogReward[],
    initialized: false,
    hasOrderChanges: false,
  }),

  actions: {
    async initData() {
      if (this.initialized) return

      await this.refreshData()
      this.initialized = true
    },

    async refreshData() {
      try {
        const data = await $fetch<CatalogReward[]>("/api/catalog-rewards/items")
        this.data = cloneDeep(data)
        this.initialData = cloneDeep(data)
        this.hasOrderChanges = false
      } catch (e) {
        console.error("Failed to fetch catalog-rewards items:", e)
      }
    },

    async createItem(formData: FormData): Promise<{ error?: string }> {
      try {
        const { error } = await $fetch("/api/catalog-rewards/items", { method: "POST", body: formData })
        await this.refreshData()

        return { error }
      } catch (error) {
        return { error: String(error) }
      }
    },
    async deleteItem(id: number): Promise<{ error?: string }> {
      try {
        const { error } = await $fetch("/api/catalog-rewards/items", { method: "DELETE", query: { id } })
        await this.refreshData()

        return { error }
      } catch (error) {
        return { error: String(error) }
      }
    },
    async updateItem(formData: FormData, id: number): Promise<{ error?: string }> {
      try {
        const { error } = await $fetch("/api/catalog-rewards/items", { method: "PUT", body: formData, query: { id } })
        const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
        await sleep(1000) // не успевает blob storage

        await this.refreshData()

        return { error }
      } catch (error) {
        return { error: String(error) }
      }
    },
  },
})
