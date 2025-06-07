<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui"
import { useCurrentStore } from "~/composables/currentStore"
import type { AnyItem, StoreType } from "~/types/admin"
import type { Lang } from "~/types/catalog"

const props = defineProps<{
  columns: TableColumn<Record<string, any>>[]
  filter: string
  storeType: StoreType
  lang: Lang
}>()

const storeType = inject<StoreType>("storeType")
const currentStore = useCurrentStore(storeType)
if (!currentStore) throw new Error("!currentStore")
const { data } = storeToRefs(currentStore)

// фильтрованные данные (только для режима "filter")
const filteredData = computed(() => {
  return data.value
    .filter((item) =>
      [item.id, item.title, item.sub_title, item.text, item.category, item.priority, item.lang]
        .filter(Boolean)
        .some((field) => field!.toString().toLowerCase().includes(props.filter.trim().toLowerCase())),
    )
    .filter((item) => item.lang === props.lang)
})
</script>

<template>
  <UTable :data="filteredData" :columns ref="table">
    <template #actions-cell="{ row }">
      <div class="flex gap-2">
        <NuxtErrorBoundary>
          <admin-chanks-button-delete-item :itemId="row.original.id!" />
          <admin-chanks-button-edit-item :itemId="row.original.id!" />

          <template #error="{ error }">
            <p class="absolute bg-amber-200">{{ error }}</p>
          </template>
        </NuxtErrorBoundary>
      </div>
    </template>

    <template #images-cell="{ row }">
      <UBadge v-if="row.original.images.length > 0" color="success" label="exist" />
      <UBadge v-else color="warning" label="empty" />
    </template>
  </UTable>
</template>
