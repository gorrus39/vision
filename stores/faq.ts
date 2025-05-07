import { defineStore } from "pinia"
import type { FullFaqItem } from "~/types/faq"

const getData = async (): Promise<FullFaqItem[]> => $fetch("/api/faq/items")

export const useFaqStore = defineStore("faqStore", {
  state: () => ({
    data: [] as FullFaqItem[],
    initialized: false,
    counter: [{}],
  }),

  actions: {
    async fetchData() {
      if (!this.initialized) {
        this.data = await $fetch("/api/faq/items")
        this.initialized = true
      }
      return this.data
    },
    async increment() {
      this.counter.push({})
    },
    async createFaqItem(formData: FormData) {
      try {
        const { error } = await $fetch("/api/faq/items", { method: "POST", body: formData })
        this.data = await getData()

        return { error }
      } catch (error) {
        return { error }
      }
    },
  },
  getters: {},
})
