<script setup lang="ts">
const { ui } = useAppConfig()
const toast = useToast()
const store = await useInitializedCatalogItemsStore()
const { delete_item_remote } = store

const props = defineProps<{
  id: number | undefined
}>()

const show = ref(false)
const loading = ref(false)

const deleteItem = async () => {
  const id = props.id
  loading.value = true
  if (!id) {
    toast.add({ title: "front. id:undefined", color: "error" })
  } else {
    const { error, success } = await delete_item_remote(id)
    if (success) toast.add({ title: "success" })
    if (error) toast.add({ title: error as string, color: "error" })
  }
  loading.value = false
  show.value = false
}
</script>

<template>
  <UModal v-model:open="show">
    <UIcon class="on-hover h-5 w-5" :name="ui.iconsExt.delete" @click="show = true" />

    <template #header>
      <p class="text-center text-2xl text-black">Are you sure?</p>
    </template>

    <template #body>
      <p>Delete item id: {{ id }}</p>
    </template>

    <template #footer>
      <UButton @click="deleteItem" :loading label="delete" color="error" />
      <UButton @click="show = false" :disabled="loading" label="cancel" color="error" variant="outline" />
    </template>
  </UModal>
</template>
