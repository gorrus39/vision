<script setup lang="ts">
import { CatalogIdExpandButton } from "#components"
import type { FullCatalogItem } from "~/types/catalog"

const isExpanded = ref(false)

defineProps<{
  item: FullCatalogItem
}>()
</script>

<template>
  <div class="relative">
    <NuxtImg
      class="absolute right-[1vw] top-[-1vw] z-20 w-M-90 h-M-90 md:w-D-221 md:h-D-221"
      src="/images/catalog/id/description-1.png"
    />
    <NuxtImg
      class="absolute bottom-0 z-0 w-M-75 h-M-150 md:w-D-150 md:h-D-300"
      src="/images/catalog/id/description-2.png"
    />

    <CatalogIdTitleBlock :text="$t('catalog.id.description')" />

    <div
      class="relative z-10 overflow-hidden mb-M-0 md:mb-D-111"
      :class="[isExpanded ? 'max-h-none' : 'max-h-[103vw]']"
    >
      <div
        class="x-mx border-e-[2px] border-t-[2px] pt-M-10 pe-M-10 text-M-14 md:border-e-[.5px] md:border-t-[.5px] md:pt-D-20 md:pe-D-20 md:text-D-32"
        v-html="item.description_large"
      ></div>
    </div>
    <CatalogIdExpandButton class="block md:hidden" v-model="isExpanded" />
  </div>
</template>
