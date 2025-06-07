<script setup lang="ts">
import { FaqAdminForm } from "#components"
import { iconPaths } from "~/assets/icon-paths"

// const modal = useModal()
const showForm = ref(false)

const store = useFaqStore()
await callOnce("faq-items", () => store.initData())
const loading = ref(false)
const toast = useToast()

const openForm = () => {
  showForm.value = true
}

const postChangedOrder = async () => {
  loading.value = true
  try {
    await store.postUpdateItemsOrder()
    toast.add({ title: "Порядок успешно обновлён!" })
  } catch (error) {
    toast.add({ title: String(error), color: "error" })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div></div>
  <!-- <u-modal fullscreen :ui="{ base: 'p-4 flex flex-col gap-2' }">
    <div class="flex items-center gap-2">
      <u-button label="New F.A.Q. item" :disabled="loading" @click="openForm" />
      <u-button
        label="Post changed order"
        :loading
        :disabled="!store.hasOrderChanges"
        :variant="store.hasOrderChanges ? 'solid' : 'outline'"
        @click="postChangedOrder"
      />
      <u-button
        label="Close"
        variant="outline"
        :disabled="loading"
        color="red"
        @click="modal.close"
        :icon="iconPaths.close"
      />
    </div>

    <u-slideover v-model="showForm" :ui="{ width: 'max-w-xl' }">
      <faq-admin-form :item="null" @close-form="showForm = false" />
    </u-slideover>

    <faq-admin-table :items="store.data"></faq-admin-table>
  </u-modal> -->
</template>
