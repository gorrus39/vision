<script setup lang="ts">
const { locale } = useI18n()
import type { FullCatalogItem, Lang } from "~/types/catalog"

const props = defineProps<{
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

const imageLarge = props.item.images.find((i) => i.is_title)
</script>

<template>
  <div class="mb-M-30 md:mb-D-80 relative">
    <NuxtImg class="w-D-600 absolute -top-[18vw] -z-10 hidden md:block" src="images/catalog/id/logo-left.png" />
    <NuxtImg class="w-D-350 absolute -top-[10vw] right-0 hidden md:block" src="images/catalog/id/logo-right.png" />

    <div class="relative z-10">
      <p class="font-secondary mb-M-20 text-M-42 md:mb-D-20 md:text-D-100 text-center">{{ item.title }}</p>
      <div class="x-mx gap-M-20 md:gap-D-20 flex flex-col items-center md:flex-row">
        <img
          class="w-full max-w-full flex-1 md:max-w-[40vw]"
          v-if="imageLarge"
          :src="getImagePath(imageLarge)"
          alt=""
        />
        <p class="text-M-12 md:text-D-22 flex-1">{{ getByLang(item.description_short) }}</p>
      </div>
    </div>
  </div>
</template>
