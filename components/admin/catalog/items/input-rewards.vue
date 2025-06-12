<script setup lang="ts">
import type { SelectMenuItem } from "@nuxt/ui"
import type { CatalogReward } from "~/types/catalog"

const store = useCatalogRewardsStore()
await callOnce("catalog-rewards-items", () => store.initData())
const { data } = store
const props = defineProps<{
  rewards: CatalogReward[]
}>()

const items = ref<SelectMenuItem[]>(
  data.map((origin) => ({ label: origin.name, id: origin.id, avatar: { src: getImagePath(origin.images[0]) } })),
)

const init = () => {
  const arr: SelectMenuItem[] = []
  const map = new Map()
  data.forEach((i) => map.set(i.id, i))

  props.rewards.forEach((rew) => {
    if (map.has(rew.id)) arr.push(map.get(rew.id))
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
