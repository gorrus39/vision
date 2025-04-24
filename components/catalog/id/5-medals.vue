<script setup lang="ts">
import type { FullCatalogItem } from "~/types/catalog"

const props = defineProps<{
  item: FullCatalogItem
}>()

const medals = props.item.rewards
</script>

<template>
  <CatalogIdTitleBlock :text="$t('catalog.id.medals')" />
  <div class="x-mx flex flex-wrap justify-center mb-M-30 md:mb-D-70">
    <div
      class="mx-auto flex rounded-[3vw] border-[2px] border-solid border-white gap-M-10 p-M-15 md:rounded-[2vw] md:border-[.5px] md:gap-D-40 md:p-D-50"
    >
      <CatalogIdMedalItem v-for="medal in medals" :medal="medal" />
    </div>
  </div>
</template>

<!-- <div
    class="h-96 w-96 border-[2px] border-solid border-red-500"
    :style="{ backgroundImage: `url(${backgroundUrl})` }"
  ></div> -->
<!-- <p>asdf</p>
  <img class="h-10 w-10 border-[2px] border-solid border-red-500" :src="backgroundUrl" />
  <p>asdf</p>
  <NuxtImg class="h-10 w-10 border-[2px] border-solid border-red-500" :src="backgroundUrl" />
  <p>asdf</p>
  <div class="img h-96 w-96 border-[2px] border-solid border-red-500"></div>
  <p>asdf</p> -->
