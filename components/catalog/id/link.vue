<script setup lang="ts">
import type { CatalogLink } from "~/types/catalog"
import type { LinkType } from "./3-links.vue"

defineProps<{
  link: CatalogLink
  type: LinkType
}>()

const getImgSrc = (link: CatalogLink) => {
  let path = "/images/catalog-links/"
  switch (link.src_platform) {
    case "web":
      path += "web.png"
      break
    case "telegram":
      path += "telegram.png"
      break
    case "signal":
      path += "signal.png"
      break
    case "other":
      path += "other.png"
      break
  }
  return path
}
</script>

<template>
  <NuxtLink class="on-hover" :to="link.link">
    <div
      class="relative flex w-full flex-col overflow-hidden rounded-xl border-[1px] border-solid border-white md:rounded-md md:border-[.5px] md:w-D-350"
    >
      <NuxtImg class="absolute h-full w-full" src="images/default/catalog-item-img-short/background-black.png" />
      <div class="relative z-10 m-M-10 md:m-D-20">
        <!-- <NuxtLink class="ms-auto block w-max" :to="link.link"> -->
        <NuxtImg class="ms-auto w-M-20 h-M-20 md:w-D-30 md:h-D-30" src="/images/home/arrow-link.svg" />
        <!-- </NuxtLink> -->
        <div class="flex items-center gap-M-15 md:gap-D-26">
          <NuxtImg class="w-M-35 h-M-35 md:w-D-60 md:h-D-60" :src="getImgSrc(link)" />
          <div class="flex flex-1 flex-col">
            <p class="font-semibold text-M-12 md:text-D-26">{{ link.title }}</p>
            <p class="text-M-10 md:text-D-20">{{ link.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
