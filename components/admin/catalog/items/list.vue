<script setup lang="ts">
import { UButton } from "#components"
import type { TableColumn } from "@nuxt/ui"
import { type CatalogItem, type FullBriefJson, type FullCatalogItem, type Tag } from "~/types/catalog"

const showListItemsModal = defineModel<boolean>()
const showForm = ref(false)
const selectedId = ref<undefined | number>(undefined)
const toast = useToast()
const loadingDelete = ref(false)

const availibleTags: Tag[][] = [
  ["kozmap", "oracle"],
  ["english", "russian", "chinese", "spanish", "french"],
  ["chat", "markets", "forums", "top sellers", "essentials", "others"],
]

const filterTags = ref<Tag[]>([...availibleTags[0], ...availibleTags[1], ...availibleTags[2]])

const store = await useInitializedCatalogItemsStore()

const { items } = storeToRefs(store)

const columns: TableColumn<FullCatalogItem>[] = [
  { accessorKey: "actions", header: "actions", meta: { class: { td: "w-5", th: "w-5" } } },
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
  { accessorKey: "top", header: "top", meta: { class: { td: "w-5", th: "w-5" } } },
  {
    accessorKey: "title",
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "title",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      })
    },
  },
  { accessorKey: "rewards", header: "rewards" },
  { accessorKey: "admins", header: "admins" },
  { accessorKey: "tags", header: "tags" },
  {
    accessorKey: "brief",
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "reiting-by-brief",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      })
    },
    // sort: (a: string, b: string, direction: any) => {
    //   const aJson = JSON.parse(a) as FullBriefJson
    //   const bJson = JSON.parse(b) as FullBriefJson

    //   const value_a: number | null = getBriefAgrigationValue({ items: aJson.items }).sumValue // a[0]?.value
    //   const value_b: number | null = getBriefAgrigationValue({ items: bJson.items }).sumValue //b[0]?.value

    //   if (value_a == value_b) return 0
    //   if (value_a == null) return direction == "asc" ? 1 : -1
    //   if (value_b == null) return direction == "asc" ? -1 : 1

    //   return direction == "asc" ? value_b - value_a : value_a - value_b
    // },
  },
  { accessorKey: "links", header: "links" },
]

const try_add_item = () => {
  selectedId.value = undefined
  showForm.value = true
}

const rowsBySelectedTags = computed<FullCatalogItem[]>(() => {
  return items.value.filter((row) => {
    const tags = JSON.parse(row.tags) as Tag[]
    return tags.some((rowTag) => filterTags.value.includes(rowTag))
  })
})

watchEffect(() => (showForm.value = typeof selectedId === "number"))
</script>

<template>
  <div class="space-y-2 p-2 text-black">
    <admin-catalog-items-button-new-item />
    <hr />

    <p>filter by Tags ({{ rowsBySelectedTags.length }})</p>
    <admin-catalog-items-filter-tags v-model="filterTags" :availibleTags="availibleTags" />

    <hr />

    <UTable :data="rowsBySelectedTags" :columns>
      <template #actions-cell="{ row }">
        <div class="flex gap-2">
          <admin-catalog-items-button-delete-item :id="row.original.id" />
          <admin-catalog-items-button-edit-item :item="row.original" />
        </div>
      </template>

      <template #rewards-cell="{ row }">
        <div>
          <span>{{ row.original.rewards.length }} reward{{ row.original.rewards.length > 1 ? "s" : "" }}</span>
          <span class="flex items-center space-x-1">
            <img
              class="w-4"
              v-for="reward of row.original.rewards"
              :key="reward.id"
              :src="getImagePath(reward.images[0])"
              alt="img"
            />
          </span>
        </div>
      </template>

      <template #admins-cell="{ row }">
        <div>
          <span>{{ row.original.admins.length }} admin{{ row.original.admins.length > 1 ? "s" : "" }}</span>
          <span class="flex items-center space-x-1">
            <img
              class="w-4"
              v-for="admin of row.original.admins"
              :key="admin.id"
              :src="getImagePath(admin.images[0])"
              alt="img"
            />
          </span>
        </div>
      </template>

      <!-- <template #brief-cell="{ row }">
        <div>
          <div>{{ getBriefAgrigationValue({ items: JSON.parse(row.original.brief).items }).sumValue }}</div>
        </div>
      </template> -->

      <template #links-cell="{ row }">
        <div>{{ row.original.links.length }} link{{ row.original.links.length > 1 ? "`s" : "" }}</div>
      </template>

      <template #tags-cell="{ row }">
        <div>
          <b>{{ JSON.parse(row.original.tags).length }}</b> tag{{
            JSON.parse(row.original.tags).length > 1 ? "`s" : ""
          }}
        </div>
      </template>

      <template #top-cell="{ row }">
        <p>{{ row.original.is_top ? "✅" : "❌" }}</p>
      </template>
    </UTable>
  </div>
</template>
