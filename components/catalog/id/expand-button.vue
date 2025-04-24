<script setup lang="ts">
const isExpanded = defineModel<boolean>()
</script>

<template>
  <div class="x-mx border-M-e flex items-center gap-M-10 pt-M-10" @click="isExpanded = !isExpanded">
    <p class="text-[#BBBBBB] text-M-14">Show</p>
    <img class="w-M-10" :class="[isExpanded ? 'rotate-0' : 'rotate-180']" src="/images/catalog/id/arrow.svg" />
  </div>
</template>
