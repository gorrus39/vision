<script setup lang="ts">
import type { FullCatalogItem } from "~/types/catalog"

const adminsStore = useCatalogAdminsStore()
await callOnce(async () => await adminsStore.initData())

const storeAdmins = adminsStore.data

const props = defineProps<{
  item: FullCatalogItem
}>()

const catalogItemAdmins = props.item.catalog_admin_ids
  .map((adminId) => storeAdmins.find((admin) => admin.id === adminId))
  .filter((a) => a !== undefined)
</script>

<template>
  <CatalogIdTitleBlock :text="$t('catalog.id.admins')" />
  <div class="flex-container x-mx gap-M-20 mb-M-20 md:gap-D-30 md:mb-D-80 flex flex-wrap justify-between">
    <CatalogIdAdminCard v-for="admin in catalogItemAdmins" :admin />
  </div>
  <div class="x-mx mb-M-73 md:mb-D-80 flex">
    <ChanksButtonGoUp class="ms-auto" />
  </div>
</template>

<style>
.flex-container::after {
  content: "";
  flex: auto;
}
</style>
