<script setup lang="ts">
const showMainModal = defineModel<boolean>();
</script>

<template>
  <UModal v-model="showMainModal" :ui="{ base: 'p-4 space-y-4' }" fullscreen>
    <BlogAdminInternalBar v-model="showMainModal" />

    <BlogAdminTable />
  </UModal>
</template>
