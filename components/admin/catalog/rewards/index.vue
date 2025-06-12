<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui"
import type { AdminTableModeLiteral, AnyItem, FormEntries, StoreType } from "~/types/admin"
import { catalogRewardSchema, type CatalogReward, type Lang } from "~/types/catalog"
import { provide } from "vue"
import type { Image } from "~/types/common"
import { UButton } from "#components"

const store = useCurrentStore("catalogRewardsStore")

await callOnce("catalog-rewards-items", () => store.initData())

const loading = ref(false)
const filter = ref("")
const lang = ref<Lang>("ru")

const columns: TableColumn<AnyItem>[] = [
  // const columns: TableColumn<CatalogAdmin>[] = [
  { accessorKey: "actions", header: "Act", meta: { class: { td: "w-24", th: "w-24" } } },
  {
    accessorKey: "id",
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "id",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      })
    },

    meta: { class: { td: "w-5", th: "w-5" } },
  },
  { accessorKey: "images", header: "image", meta: { class: { td: "w-10", th: "w-10" } } },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "name",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      })
    },
    meta: { class: { td: "w-10", th: "w-10" } },
  },
  { accessorKey: "description", header: "description" },
]

provide<FormEntries<CatalogReward>>("formEntries", {
  images: { maxAmount: 1 },
  schema: catalogRewardSchema,
  lang,
  emptyItem: {
    images: [],
    description: "",
    name: "",
  },
  handleSubmit: async (state: Ref<CatalogReward>): Promise<{ error?: string | undefined }> => {
    const formData = new FormData()
    // повставлять frontendFile
    // удалить из json frontendFile
    for (let i = 0; i < state.value.images.length; i++) {
      const imageJson: Image = state.value.images[i]
      if (!imageJson.frontendFile) continue

      formData.set(`photo__index_${i}`, imageJson.frontendFile)
      delete state.value.images[i].frontendFile
    }

    formData.set("catalogRewardItemJson", JSON.stringify(state.value))

    let error = undefined
    const id = state.value.id
    if (id) {
      error = (await store.updateItem(formData, id)).error
    } else {
      error = (await store.createItem(formData)).error
    }
    return { error }
  },
})

provide<StoreType>("storeType", "catalogRewardsStore")
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <admin-chanks-button-new-item :loading :lang />
      <!-- <UInput class="w-64" v-model="filter" color="secondary" placeholder="Filter..." /> -->
    </div>
    <!-- Filter Table -->
    <admin-chanks-table-mode-base :columns :filter :store-type="'faqStore'" :lang />
  </div>
</template>
