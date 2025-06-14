<script setup lang="ts">
const { ui } = useAppConfig()
const toast = useToast()
const store = useCatalogItemsStore()

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
    const { error } = await store.deleteItem(id)
    if (error) toast.add({ title: error as string, color: "error" })
    else toast.add({ title: "success" })
  }
  loading.value = false
  show.value = false
}
</script>

<template>
  <UModal v-model:open="show" :ui="{ content: 'text-black' }">
    <UIcon class="on-hover h-5 w-5" :name="ui.iconsExt.delete" @click="show = true" />

    <template #header>
      <p class="text-center text-2xl">Are you sure?</p>
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
