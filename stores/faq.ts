import { defineStore } from "pinia"
import type { FullFaqItem } from "~/types/faq"
import { cloneDeep } from "lodash"

export const useFaqStore = defineStore("faqStore", {
  state: () => ({
    initialData: [] as FullFaqItem[],
    data: [] as FullFaqItem[],
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
        const data = await $fetch<FullFaqItem[]>("/api/faq/items")
        this.data = cloneDeep(data)
        this.initialData = cloneDeep(data)
        this.hasOrderChanges = false
      } catch (e) {
        console.error("Failed to fetch FAQ items:", e)
      }
    },

    async createItem(formData: FormData): Promise<{ error?: string }> {
      try {
        const { error } = await $fetch("/api/faq/items", { method: "POST", body: formData })
        await this.refreshData()

        return { error }
      } catch (error) {
        return { error: String(error) }
      }
    },
    async deleteItem(id: number): Promise<{ error?: string }> {
      try {
        const { error } = await $fetch("/api/faq/items", { method: "DELETE", query: { id } })
        await this.refreshData()

        return { error }
      } catch (error) {
        return { error: String(error) }
      }
    },
    async updateItem(formData: FormData, id: number): Promise<{ error?: string }> {
      try {
        const { error } = await $fetch("/api/faq/items", { method: "PUT", body: formData, query: { id } })
        const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
        await sleep(1000) // не успевает blob storage

        await this.refreshData()

        return { error }
      } catch (error) {
        return { error: String(error) }
      }
    },

    makeOrderChanges() {
      this.hasOrderChanges = true
    },

    async postUpdateItemsOrder(idsPosition: number[]) {
      const bodyJson: Record<string, number> = {}

      // отправляем только {[id]:order_index}[]
      for (let i = 0; i < idsPosition.length; i++) {
        bodyJson[idsPosition[i]] = i
      }

      try {
        const { error } = await $fetch("/api/faq/update-order", { method: "POST", body: JSON.stringify(bodyJson) })
        await this.refreshData()

        return { error }
      } catch (error) {
        return { error }
      }
    },
  },
})
