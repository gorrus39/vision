<script setup lang="ts">
import type { SelectMenuItem } from "@nuxt/ui"
import type { CatalogAdmin } from "~/types/catalog"

const store = useCatalogAdminsStore()
await callOnce("catalog-admins-items", () => store.initData())
const { data } = store
const props = defineProps<{
  admins: CatalogAdmin[]
}>()

const items = ref<SelectMenuItem[]>(
  data.map((origin) => ({ label: origin.name, id: origin.id, avatar: { src: getImagePath(origin.images[0]) } })),
)

const init = () => {
  const arr: SelectMenuItem[] = []
  const map = new Map()
  data.forEach((i) => map.set(i.id, i))

  props.admins.forEach((admin) => {
    if (map.has(admin.id)) arr.push(map.get(admin.id))
  })
  return arr
}

const value = ref(init())
</script>

<template>
  <USelectMenu
    class="w-48"
    v-model="value"
    :search-input="false"
    multiple
    :items="items"
    @change="$emit('change', value)"
  >
    <template #item-leading="{ item }">
      <!-- @vue-ignore -->
      <img class="h-6 w-6 rounded-full" :src="item?.avatar.src" />
    </template>
  </USelectMenu>
</template>
