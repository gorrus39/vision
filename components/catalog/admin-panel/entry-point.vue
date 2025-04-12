<script setup lang="ts">
const showListItemsModal = ref(false)
const showModalRewards = ref<boolean>(false)
const showModalCatalogAdmins = ref<boolean>(false)
</script>
<template>
  <div class="hidden space-x-2 p-2 md:block">
    <UButton icon="i-lucide:settings" @click="showListItemsModal = true" label="Catalog Items" />
    <UButton icon="i-lucide:settings" @click="showModalRewards = true" label="Rewards" />
    <UButton icon="i-lucide:settings" @click="showModalCatalogAdmins = true" label="Admins" />
  </div>

  <CatalogAdminPanelItemsList v-model="showListItemsModal" />
  <CatalogRewardsList v-model="showModalRewards" />
  <CatalogAdminsList v-model="showModalCatalogAdmins" />
</template>
