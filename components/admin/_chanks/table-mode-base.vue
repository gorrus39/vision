<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui"
import { useCurrentStore } from "~/composables/currentStore"
import type { AnyItem, StoreType } from "~/types/admin"
import type { Lang } from "~/types/catalog"
import { format } from "date-fns"

const props = defineProps<{
  columns: TableColumn<Record<string, any>>[]
  filter: string
  storeType: StoreType
  lang?: Lang
}>()

const storeType = inject<StoreType>("storeType")
const currentStore = useCurrentStore(storeType)
if (!currentStore) throw new Error("!currentStore")
const { data } = storeToRefs(currentStore)

// фильтрованные данные (только для режима "filter")
const filteredData = computed(() => {
  return data.value
    .filter((item) => {
      const values = Object.values(item)
      return values
        .filter(Boolean)
        .some((field) => field!.toString().toLowerCase().includes(props.filter.trim().toLowerCase()))
    })
    .filter((item) => {
      if (!props.lang) return true
      if (!("lang" in item)) return true

      return item.lang === props.lang
    })
})
</script>

<template>
  <UTable :data="filteredData" :columns ref="table">
    <template #actions-cell="{ row }">
      <div class="flex gap-2">
        <admin-chanks-button-delete-item :itemId="row.original.id!" />
        <admin-chanks-button-edit-item :itemId="row.original.id!" />
      </div>
    </template>

    <template #images-cell="{ row }">
      <img
        class="h-8 w-8 rounded-full"
        v-if="storeType === 'catalogAdminsStore' && row.original.images[0]"
        :src="getImagePath(row.original.images[0])"
        alt="avatar"
      />

      <img
        v-else-if="storeType === 'catalogRewardsStore' && row.original.images[0]"
        :src="getImagePath(row.original.images[0])"
        alt="avatar"
      />
      <div v-else>
        <UBadge v-if="row.original.images.length > 0" color="success" label="exist" />
        <UBadge v-else color="warning" label="empty" />
      </div>
    </template>

    <template #published_at-cell="{ row }">
      <p>
        {{ format(new Date(row.original.published_at), "d MMM, yyy") }}
      </p>
    </template>
  </UTable>
</template>
