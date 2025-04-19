<script setup lang="ts">
import type { Bunner } from "~/types/catalog"

const store = await useInitializedCatalogBunnersStore()
const { items } = storeToRefs(store)

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
})
</script>

<template>
  <div class="mt-D-50 me-D-182 ms-D-182">
    <UCarousel
      v-slot="{ item, index }: { item: Bunner; index: number }"
      ref="carouselRef"
      :items="items"
      :ui="{ item: 'w-full h-D-500' }"
    >
      <img class="w-full object-cover" :src="getBunnerImageUrl(item.img_path)" alt="item" draggable="false" />
    </UCarousel>
  </div>
</template>
