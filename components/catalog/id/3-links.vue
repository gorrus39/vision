<script setup lang="ts">
import type { CatalogLink, FullCatalogItem } from "~/types/catalog"

export type LinkType = "telegram" | "web" | "signal" | "other"

const props = defineProps<{
  item: FullCatalogItem
}>()

const filterBy = (links: CatalogLink[], src_platform: LinkType) => {
  return links.filter((l) => l.src_platform === src_platform)
}

const linksArr: Ref<{ type: LinkType; items: CatalogLink[] }[]> = computed(() => {
  const all: { type: LinkType; items: CatalogLink[] }[] = [
    { type: "telegram", items: filterBy(props.item.links, "telegram") },
    { type: "web", items: filterBy(props.item.links, "web") },
    { type: "signal", items: filterBy(props.item.links, "signal") },
    { type: "other", items: filterBy(props.item.links, "other") },
  ]
  return all.filter((i) => i.items.length > 0)
})
</script>

<template>
  <CatalogIdTitleBlock text="LINKS" />
  <div class="x-mx flex flex-col justify-between gap-M-20 mb-D-90 md:flex-row md:gap-0">
    <div class="flex flex-col gap-M-15 md:gap-D-40" v-for="{ type, items } in linksArr">
      <p class="font-semibold text-M-12 md:text-D-26">{{ type.toUpperCase() }}</p>
      <div v-for="item in items">
        <CatalogIdLink :link="item" :type="type" />
      </div>
    </div>
  </div>
</template>
