<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui"
import { useSortable } from "@vueuse/integrations/useSortable.mjs"
import { useCurrentStore } from "~/composables/currentStore"
import type { AnyItem, StoreType } from "~/types/admin"
import type { Lang } from "~/types/catalog"

const props = defineProps<{
  columns: TableColumn<Record<string, any>>[]
  storeType: StoreType
  lang?: Lang
}>()
const currentStore = useCurrentStore(inject<StoreType>("storeType"))
if (!currentStore) throw new Error("!currentStore")

const localData = ref<AnyItem[]>(
  currentStore.data.filter((item) => {
    if (!props.lang) return true
    if (!("lang" in item)) return true

    return item.lang === props.lang
  }),
)

const emits = defineEmits(["make-order-changes"])

const orderChangeTriggered = ref(false)

useSortable(".my-table-tbody", localData, {
  animation: 150,

  onUpdate: () => {
    if (!orderChangeTriggered.value) {
      emits("make-order-changes")
      orderChangeTriggered.value = true
    }
  },
})
</script>

<template>
  <UTable
    :data="localData"
    :columns
    :ui="{
      tbody: 'my-table-tbody',
    }"
    :get-row-id="(row) => String(row.id)"
  >
    <template #images-cell="{ row }">
      <UBadge v-if="row.original.images.length > 0" color="success" label="exist" />
      <UBadge v-else color="warning" label="empty" /> </template
  ></UTable>
</template>
