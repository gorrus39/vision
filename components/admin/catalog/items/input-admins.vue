<script setup lang="ts">
import type { SelectMenuItem } from "@nuxt/ui"
import type { CatalogAdmin } from "~/types/catalog"

const store = useCatalogAdminsStore()
await callOnce("catalog-admins-items", () => store.initData())
const { data } = store
const props = defineProps<{
  admin_ids: number[]
}>()
const emits = defineEmits(["change"])

type SelectOption = SelectMenuItem & { id: number | undefined }

const items = ref<SelectOption[]>(
  data.map((origin) => ({ label: origin.name, id: origin.id, avatar: { src: getImagePath(origin.images[0]) } })),
)

const init = (): SelectOption[] => {
  return items.value.filter((item) => {
    const id = (item as any).id as number | undefined
    return id && props.admin_ids.includes(id)
  })
}

const state = ref(init())
const handleChange = () => {
  const ids: number[] = state.value.map((r) => r.id).filter((id): id is number => id !== undefined)
  emits("change", ids)
}
</script>

<template>
  <USelectMenu
    class="w-full min-w-48"
    v-model="state"
    :search-input="false"
    multiple
    :items="items"
    @change="handleChange"
  >
    <template #item-leading="{ item }">
      <!-- @vue-ignore -->
      <img class="h-6 w-6 rounded-full" :src="item.avatar.src" />
    </template>
  </USelectMenu>
</template>
