<script setup lang="ts">
import { useCurrentStore } from "~/composables/currentStore"
import type { StoreType } from "~/types/admin"

const { ui } = useAppConfig()
const props = defineProps<{
  itemId: number
  disabled?: true
}>()
const storeType = inject<StoreType>("storeType", "faqStore")
const currentStore = useCurrentStore(storeType)
if (!currentStore) throw Error("!currentStore")

const toast = useToast()
const open = ref(false)

const handleDeleteItem = async () => {
  const { error } = await currentStore.deleteItem(props.itemId ?? -1)
  if (!error) toast.add({ title: "Successfully!" })
  else toast.add({ title: String(error), color: "error" })
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" :title="`Are you sure delete ${getItemLabel(storeType)} item? (id: ${itemId})`">
    <UIcon class="on-hover size-5" :name="ui.iconsExt.delete" />

    <template #footer>
      <UButton color="error" @click="handleDeleteItem">Delete</UButton>
      <UButton color="error" variant="outline" @click="open = false">Cancel</UButton>
    </template>
  </UModal>
</template>
