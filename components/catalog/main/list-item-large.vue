<script setup lang="ts">
import type { FullCatalogItem } from "~/types/catalog"

const props = defineProps<{
  item: FullCatalogItem
  index: number
  fromAdminPanel?: true
}>()

const imageLarge = props.item.images.find((i) => i.is_title)
</script>

<template>
  <NuxtLinkLocale class="hover:cursor-pointer" :to="`/catalog/${item.id}`">
    <div class="md:w-D-335 w-full">
      <div class="border-D h-M-146 md:h-D-221 relative flex w-full items-center justify-center rounded-lg border-black">
        <img
          class="absolute z-10 w-full object-cover"
          :src="`/images/default/catalog-item-img-short/background-${index % 2 == 0 ? 'black' : 'white'}.png`"
        />
        <img
          class="absolute z-20 max-h-[90%] max-w-[90%] object-cover"
          v-if="imageLarge"
          :src="getImagePath(imageLarge)"
        />
      </div>
      <p class="text-M-12 m-D-20 mt-M-20 md:text-D-18 md:mt-D-20 text-center font-semibold" v-if="!fromAdminPanel">
        {{ item.title.toUpperCase() }}
      </p>
    </div>
  </NuxtLinkLocale>
</template>
