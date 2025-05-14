<script setup lang="ts">
const props = defineProps<{ id: number }>()
const store = useFaqStore()
const toast = useToast()

const show = ref(false)

const handleDeleteItem = async () => {
  const { error } = await store.deleteFaqItem(props.id)
  if (!error) toast.add({ title: "Запись удалена." })
  else toast.add({ title: String(error), color: "red" })
  show.value = false
}
</script>

<template>
  <UModal class="text-black" v-model="show">
    <div class="flex flex-col items-center gap-2 p-3">
      <h1>Are you sure delete item?</h1>
      <h2>item_id: {{ id }}</h2>
      <div class="space-x-2">
        <UButton color="red" @click="handleDeleteItem">Delete</UButton>
        <UButton color="red" variant="outline" @click="show = false">Cancel</UButton>
      </div>
    </div>
  </UModal>

  <UIcon class="on-hover" name="i-mdi-light:delete" @click="show = true" />
</template>
