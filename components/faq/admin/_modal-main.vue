<script setup lang="ts">
import { iconPaths } from "~/assets/icon-paths"
import type { FullFaqItem } from "~/types/faq"
const modal = useModal()

// const defaultState = (): FullFaqItem => ({
//   title: "123",
//   text: "123",
//   category: "123",
//   order_index: 0,
//   priority: "High",
//   lang: "en",
//   images: [],
// })
// const state = ref<FullFaqItem>(defaultState())

const store = useFaqStore()
await callOnce("faq-items", () => store.fetchData())

// const post = async () => {
//   loading.value = true
//   const formData = new FormData()

//   state.value.images.forEach((image, index) => {
//     if (image.frontendFile) {
//       formData.append(`photo__index_${index}`, image.frontendFile)
//       // удаляем frontendFile из json чтоб на сервере не обрабатывать это поле из-за zod
//       delete image.frontendFile
//     }
//   })

//   formData.append("faqItemJson", JSON.stringify(state.value))

//   const res = await store.create(formData)
//   if (res.error) {
//     toast.add({ title: String(res.error), color: "red" })
//   } else {
//     toast.add({ title: "successfully" })
//   }
//   state.value = defaultState()
//   loading.value = false
// }

const loading = ref(false)
const toast = useToast()
</script>

<template>
  <u-modal fullscreen :ui="{ base: 'p-4' }">
    <div>
      <u-button variant="outline" color="red" @click="modal.close" :icon="iconPaths.close" label="Close" />
    </div>

    <!-- <u-button :loading :icon="iconPaths.post" @click="post" label="Post" />
    <faq-admin-form-input-photos v-model="state.images" /> -->

    <faq-admin-table :items="store.data"></faq-admin-table>
  </u-modal>
</template>
