<script setup lang="ts">
const showModal = ref<boolean>(false);
</script>

<template>
  <UButton icon="i-lucide:settings" @click="showModal = true" label="Rewards" />

  <CatalogRewardsList v-model="showModal" />
</template>
