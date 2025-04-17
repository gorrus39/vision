<script setup lang="ts">
const { locale } = useI18n()
import type { FullCatalogItem, Lang } from "~/types/catalog"

defineProps<{
  item: FullCatalogItem
}>()

const getByLang = (str: string) => {
  try {
    const json = JSON.parse(str) as { [key in Lang]: string }
    if (json[locale.value].length > 0) return json[locale.value]
    else {
      for (const description of Object.values(json)) {
        if (description.length > 0) return description
      }
    }
    return ""
  } catch (error) {
    return ""
  }
}
</script>

<template>
  <div class="relative mb-M-30 md:mb-D-80">
    <NuxtImg class="absolute -top-[18vw] hidden w-D-600 md:block" src="images/catalog/id/logo-left.png" />
    <NuxtImg class="absolute -top-[10vw] right-0 hidden w-D-350 md:block" src="images/catalog/id/logo-right.png" />

    <div class="relative z-10">
      <p class="font-secondary text-center mb-M-20 text-M-42 md:mb-D-20 md:text-D-100">{{ item.title }}</p>
      <div class="x-mx flex flex-col items-center gap-M-20 md:flex-row md:gap-D-20">
        <img class="w-full flex-1" v-if="item.img_large_path" :src="item.img_large_path" alt="" />
        <p class="flex-1 text-M-12 md:text-D-22">{{ getByLang(item.description_short) }}</p>
      </div>
    </div>
  </div>
</template>
