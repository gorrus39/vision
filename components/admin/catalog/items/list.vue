<script setup lang="ts">
import { UButton } from "#components"
import type { TableColumn } from "@nuxt/ui"
import { useCatalogItemsStore } from "~/stores/catalog-items"
import type { FullCatalogItem, Tag } from "~/types/catalog"

const showForm = ref(false)
const selectedId = ref<undefined | number>(undefined)

const rewardStore = useCatalogRewardsStore()
rewardStore.initData()
const adminStore = useCatalogAdminsStore()
adminStore.initData()

const availibleTags: Tag[][] = [
  ["kozmap", "oracle"],
  ["english", "russian", "chinese", "spanish", "french"],
  ["chat", "markets", "forums", "top sellers", "essentials", "others"],
]

const filterTags = ref<Tag[]>([...availibleTags[0], ...availibleTags[1], ...availibleTags[2]])

const store = useCatalogItemsStore()
await store.initData()

const { data: items } = storeToRefs(store)

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
  },
  { accessorKey: "links", header: "links" },
]

const rowsBySelectedTags = computed<FullCatalogItem[]>(() => {
  return items.value.filter((row) => {
    return row.tags.some((rowTag) => filterTags.value.includes(rowTag as Tag))
  })
})

watchEffect(() => (showForm.value = typeof selectedId.value === "number"))
</script>

<template>
  <div class="space-y-2 p-2 text-black">
    <admin-catalog-items-button-new-item />
    <hr />

    <p>filter by Tags ({{ rowsBySelectedTags.length }})</p>
    <admin-catalog-items-filter-tags v-model="filterTags" :availibleTags />

    <hr />
    <UTable :data="rowsBySelectedTags" :columns>
      <template #actions-cell="{ row }">
        <div class="flex gap-2">
          <admin-catalog-items-button-delete-item :id="row.original.id" />
          <admin-catalog-items-button-edit-item :id="row.original.id" />
        </div>
      </template>

      <template #rewards-cell="{ row }">
        <div>
          <span
            >{{ row.original.catalog_reward_ids.length }} reward{{
              row.original.catalog_reward_ids.length > 1 ? "s" : ""
            }}</span
          >
          <span class="flex items-center space-x-1">
            <img
              class="w-4"
              v-for="reward of rewardStore.getItemsByIds(row.original.catalog_reward_ids)"
              :key="reward.id"
              :src="getImagePath(reward.images[0])"
              alt="img"
            />
          </span>
        </div>
      </template>

      <template #admins-cell="{ row }">
        <div>
          <span
            >{{ row.original.catalog_admin_ids.length }} admin{{
              row.original.catalog_admin_ids.length > 1 ? "s" : ""
            }}</span
          >
          <span class="flex items-center space-x-1">
            <img
              class="w-4"
              v-for="admin of adminStore.getItemsByIds(row.original.catalog_admin_ids)"
              :key="admin.id"
              :src="getImagePath(admin.images[0])"
              alt="img"
            />
          </span>
        </div>
      </template>

      <template #brief-cell="{ row }">
        <div class="flex gap-2">
          <span>{{ getBriefAgrigationValue({ items: row.original.brief.items }).sumValue }}</span>
          <admin-chanks-arrow-svg
            :before="row.original.brief.lastAgrigation.sumValue"
            :after="getBriefAgrigationValue({ items: row.original.brief.items }).sumValue!"
          />
        </div>
      </template>

      <template #links-cell="{ row }">
        <div>{{ row.original.links.length }} link{{ row.original.links.length > 1 ? "`s" : "" }}</div>
      </template>

      <template #tags-cell="{ row }">
        <div>
          <b>{{ row.original.tags.length }}</b> tag{{ row.original.tags.length > 1 ? "`s" : "" }}
        </div>
      </template>

      <template #top-cell="{ row }">
        <p>{{ row.original.is_top ? "✅" : "❌" }}</p>
      </template>
    </UTable>
  </div>
</template>
