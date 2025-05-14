import { defineStore } from "pinia"
import type { FullFaqItem } from "~/types/faq"

export const useFaqStore = defineStore("faqStore", {
  state: () => ({
    dataWithInitOrderIndex: [] as FullFaqItem[],
    data: [] as FullFaqItem[],
    initialized: false,
    hasOrderChanges: false,
  }),

  actions: {
    async initData() {
      if (!this.initialized) {
        const data = (await $fetch("/api/faq/items")) as FullFaqItem[]
        this.data = data.map((item) => ({ ...item }))
        this.dataWithInitOrderIndex = data.map((item) => ({ ...item }))
        this.hasOrderChanges = false

        this.initialized = true
      }
    },
    async refreshData() {
      const data = (await $fetch("/api/faq/items")) as FullFaqItem[]
      this.data = data.map((item) => ({ ...item }))
      this.dataWithInitOrderIndex = data.map((item) => ({ ...item }))
      this.hasOrderChanges = false
    },
    async createFaqItem(formData: FormData) {
      try {
        const { error } = await $fetch("/api/faq/items", { method: "POST", body: formData })
        await this.refreshData()

        return { error }
      } catch (error) {
        return { error }
      }
    },
    async deleteFaqItem(id: number) {
      try {
        const { error } = await $fetch("/api/faq/items", { method: "DELETE", query: { id } })
        await this.refreshData()

        return { error }
      } catch (error) {
        return { error }
      }
    },
    async updateFaqItem(formData: FormData, id: number) {
      try {
        const { error } = await $fetch("/api/faq/items", { method: "PUT", body: formData, query: { id } })
        await this.refreshData()

        return { error }
      } catch (error) {
        return { error }
      }
    },
    updateItemsOrder() {
      // set order in store
      this.data.forEach((item, index) => {
        if (item.order_index !== index) {
          item.order_index = index
        }
      })

      // check hasChanges
      let hasChanges: Set<boolean> = new Set()
      // {[item.id]:order_index}
      type OrderMap = Record<string, number>
      const initAcc = (): OrderMap => ({})

      const orderMapInit: OrderMap = this.dataWithInitOrderIndex.reduce((acc, item) => {
        acc[item.id!] = item.order_index
        return acc
      }, initAcc())

      const orderMapNow: OrderMap = this.data.reduce((acc, item) => {
        acc[item.id!] = item.order_index
        return acc
      }, initAcc())
      for (const [itemId, orderIndexInit] of Object.entries(orderMapInit)) {
        const orderIndexNow = orderMapNow[itemId]
        if (orderIndexInit !== orderIndexNow) hasChanges.add(true)
        else hasChanges.add(false)
      }

      if (hasChanges.has(true)) this.hasOrderChanges = true
      else this.hasOrderChanges = false
    },
    async postUpdateItemsOrder() {
      const bodyJson: Record<string, number> = {}
      for (const item of this.data) bodyJson[item.id!] = item.order_index

      try {
        const { error } = await $fetch("/api/faq/update-order", { method: "POST", body: JSON.stringify(bodyJson) })
        await this.refreshData()

        return { error }
      } catch (error) {
        return { error }
      }
    },
  },
  getters: {},
})
