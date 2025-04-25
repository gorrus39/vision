<script setup lang="ts">
import type { FullCatalogItem } from "~/types/catalog"

defineProps<{
  item: FullCatalogItem
}>()
</script>

<template>
  <CatalogIdTitleBlock :text="$t('catalog.id.admins')" />
  <div class="flex-container x-mx flex flex-wrap justify-between gap-M-20 mb-M-20 md:gap-D-30 md:mb-D-80">
    <CatalogIdAdminCard v-for="admin in item.admins" :admin="admin" />
  </div>
  <div class="x-mx flex mb-M-73 md:mb-D-80">
    <ChanksButtonGoUp class="ms-auto" />
  </div>
</template>

<style>
.flex-container::after {
  content: "";
  flex: auto;
}
</style>
