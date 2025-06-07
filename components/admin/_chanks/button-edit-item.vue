<script setup lang="ts">
import { useCurrentStore } from "~/composables/currentStore"
import type { StoreType } from "~/types/admin"
import type { FullFaqItem } from "~/types/faq"
const { ui } = useAppConfig()

defineProps<{
  itemId: number
  disabled?: true
}>()
const open = ref(false)
// const item = ref<undefined | FullFaqItem>(undefined)

// const currentStore = useCurrentStore(inject<StoreType>("storeType"))

// const handleClick = () => {
//   if (currentStore) {
//     item.value = currentStore.data.find((i) => i.id === props.itemId)
//     open.value = true
//   } else console.error("currentStore === null")
// }
</script>

<template>
  <USlideover v-model:open="open" :title="`Edit F.A.Q. item (id: ${itemId})`">
    <UIcon class="on-hover size-5" :name="ui.iconsExt.edit" @click="open = true" />
    <template #body>
      <admin-chanks-form :itemId @close-form="open = false" />
    </template>
  </USlideover>
</template>
