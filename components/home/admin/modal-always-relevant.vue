<script setup lang="ts">
const modal = useModal()
</script>

<template>
  <UModal>
    <UButton @click="modal.close" label="close" />
  </UModal>
</template>
