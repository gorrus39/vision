<script setup lang="ts">
import type { FullCatalogItem } from "~/types/catalog"

defineProps<{
  item: FullCatalogItem
  index: number
  fromAdminPanel?: true
}>()
</script>

<template>
  <NuxtLinkLocale class="hover:cursor-pointer" :to="`/catalog/${item.id}`">
    <div class="w-full md:w-D-335">
      <div class="border-D relative flex w-full items-center justify-center rounded-lg border-black h-M-146 md:h-D-221">
        <img
          class="absolute z-10 w-full object-cover"
          :src="`/images/default/catalog-item-img-short/background-${index % 2 == 0 ? 'black' : 'white'}.png`"
        />
        <img
          class="absolute z-20 max-h-[90%] max-w-[90%] object-cover"
          v-if="item.img_short_path"
          :src="getCatalogAdminImageUrl(item.img_short_path)"
        />
      </div>
      <p class="text-center font-semibold text-M-12 m-D-20 mt-M-20 md:text-D-18 md:mt-D-20" v-if="!fromAdminPanel">
        {{ item.title.toUpperCase() }}
      </p>
    </div>
  </NuxtLinkLocale>
</template>
