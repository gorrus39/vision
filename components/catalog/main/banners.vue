<script setup lang="ts">
import type { Bunner } from "~/types/catalog"

const store = await useInitializedCatalogBunnersStore()
const { items } = storeToRefs(store)

// const carousel = useTemplateRef("carousel")

// function autoplay() {
//   if (!carousel.value) return

//   if (carousel.value.page === carousel.value.pages) {
//     return carousel.value.select(0)
//   }

//   carousel.value.next()
// }

// const intervalId = ref<ReturnType<typeof setInterval> | null>(null)

// onMounted(() => (intervalId.value = setInterval(autoplay, 3000)))
// onUnmounted(() => {
//   if (intervalId.value) clearInterval(intervalId.value)
// })
</script>

<template>
  <div class="mt-D-50 me-D-182 ms-D-182">
    <UCarousel
      v-slot="{ item, index }: { item: Bunner; index: number }"
      ref="carousel"
      :items
      :ui="{ item: 'w-full h-D-500' }"
      autoplay
      loop
    >
      <img class="w-full object-cover" :src="getBunnerImageUrl(item.img_path)" alt="item" draggable="false" />
    </UCarousel>
  </div>
</template>
