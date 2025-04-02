<script setup lang="ts">
const showModal = defineModel<boolean>();
</script>

<template>
  <UModal v-model="showModal">
    <div class="space-y-3 p-4 text-2xl text-black">
      <h1 class="text-center">Are you sure?</h1>
      <hr />
      <slot />
    </div>
  </UModal>
</template>
