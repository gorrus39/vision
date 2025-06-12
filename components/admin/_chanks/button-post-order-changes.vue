<script setup lang="ts">
import { useCurrentStore } from "~/composables/currentStore"
import type { AdminTableModeLiteral, StoreType } from "~/types/admin"

const toast = useToast()
const loading = ref(false)

// const store = useFaqStore()
// const { hasOrderChanges } = storeToRefs(store)

defineProps<{
  mode: AdminTableModeLiteral
}>()
const emits = defineEmits(["start-post", "end-post"])

const postOrderChanged = ref(async () => {})

const currentStore = useCurrentStore(inject<StoreType>("storeType"))
if (currentStore && "postUpdateItemsOrder" in currentStore) {
  postOrderChanged.value = async () => {
    emits("start-post")

    loading.value = true
    const idsPosition = getIdsPosition() as unknown as number[]

    try {
      await currentStore.postUpdateItemsOrder(idsPosition)
      toast.add({ title: "Successfully!" })
    } catch (error) {
      toast.add({ title: String(error), color: "error" })
    } finally {
      loading.value = false
    }
    emits("end-post")
  }
} else console.error("currentStore === null")

const getIdsPosition = () => {
  const [_headerTr, ...rowElements] = document.querySelectorAll("tr")

  return rowElements.map((rowEl) => {
    const [_, idElement] = rowEl.querySelectorAll("td")
    return +idElement.innerHTML
  })
}

// const postOrderChanged = async () => {
//   emits("start-post")

//   loading.value = true
//   const idsPosition = getIdsPosition() as unknown as number[]

//   try {
//     await store.postUpdateItemsOrder(idsPosition)
//     toast.add({ title: "Successfully!" })
//   } catch (error) {
//     toast.add({ title: String(error), color: "error" })
//   } finally {
//     loading.value = false
//   }
//   emits("end-post")
// }
</script>

<template>
  <UButton
    :loading
    :disabled="!currentStore?.hasOrderChanges || mode !== 'drag'"
    @click="postOrderChanged"
    label="Post ORDER changes"
  />
</template>
