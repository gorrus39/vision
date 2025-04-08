<script setup lang="ts">
const showModalRewards = ref<boolean>(false);
const showModalCatalogAdmins = ref<boolean>(false);
</script>

<template>
  <div class="space-x-2 p-2">
    <UButton icon="i-lucide:settings" @click="showModalRewards = true" label="Rewards" />
    <UButton icon="i-lucide:settings" @click="showModalCatalogAdmins = true" label="Admins" />
  </div>

  <CatalogRewardsList v-model="showModalRewards" />
  <CatalogAdminsList v-model="showModalCatalogAdmins" />
</template>
