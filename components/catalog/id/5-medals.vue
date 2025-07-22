<script setup lang="ts">
import type { FullCatalogItem } from "~/types/catalog"

const rewardsStore = useCatalogRewardsStore()
await callOnce(async () => rewardsStore.initData())

const props = defineProps<{
  item: FullCatalogItem
}>()

const medals = props.item.catalog_reward_ids
  .map((id) => rewardsStore.data.find((r) => r.id === id))
  .filter((r) => r !== undefined)
</script>

<template>
  <CatalogIdTitleBlock :text="$t('catalog.id.medals')" />
  <div class="x-mx mb-M-30 md:mb-D-70 flex flex-wrap justify-center">
    <div
      class="gap-M-10 p-M-15 md:gap-D-40 md:p-D-50 mx-auto flex rounded-[3vw] border-2 border-solid border-white md:rounded-[2vw] md:border-[.5px]"
    >
      <CatalogIdMedalItem v-for="medal in medals" :medal />
    </div>
  </div>
</template>

<!-- <div
    class="h-96 w-96 border-2 border-solid border-red-500"
    :style="{ backgroundImage: `url(${backgroundUrl})` }"
  ></div> -->
<!-- <p>asdf</p>
  <img class="h-10 w-10 border-2 border-solid border-red-500" :src="backgroundUrl" />
  <p>asdf</p>
  <NuxtImg class="h-10 w-10 border-2 border-solid border-red-500" :src="backgroundUrl" />
  <p>asdf</p>
  <div class="img h-96 w-96 border-2 border-solid border-red-500"></div>
  <p>asdf</p> -->
