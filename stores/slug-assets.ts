import { defineStore } from "pinia"
import type { SlugAsset } from "~/types/common"

export const useSlugAssetsStore = defineStore("slugAssets", {
  state: () => ({
    data: [] as SlugAsset[],
    loaded: false,
  }),

  actions: {
    async fetchData() {
      if (this.loaded) return
      const res = await $fetch("/api/slug-assets/items")
      this.data = res
      this.loaded = true
    },
    async create_or_update_by_method(state: SlugAsset, method: "POST" | "PUT") {
      try {
        const formData = new FormData()
        const { frontendFile, ...withouteFrontendFile } = state

        formData.append("item", JSON.stringify(withouteFrontendFile))
        if (state.frontendFile && state.frontendFile) {
          formData.append("frontendFile", state.frontendFile)
          formData.append("frontendFile.name", state.frontendFile.name)
          formData.append("frontendFile.type", state.frontendFile.type)
        }

        const { success, data, error } = await $fetch("/api/slug-assets/items", { method, body: formData })

        this.loaded = false
        await this.fetchData()

        return { success, data, error }
      } catch (error) {
        return { error }
      }
    },
  },
  getters: {
    alwaysRelevantAsset(): SlugAsset | undefined {
      return this.data.find((item) => item.slug == "home__always_relevant")
    },
  },
})
