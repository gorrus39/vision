<script setup lang="ts">
const showListItemsModal = ref(false);
</script>
<template>
  <div>
    <UButton icon="i-lucide:settings" @click="showListItemsModal = true" label="Catalog Items" />
  </div>

  <CatalogAdminPanelItemsList v-model="showListItemsModal" />
</template>
