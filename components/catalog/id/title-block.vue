<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <p
    class="font-secondary text-center text-M-18 mb-M-20 me-M-30 ms-M-30 mt-M-50 md:mt-D-30 md:text-D-40 md:mb-D-50 md:me-D-182 md:ms-D-182"
  >
    {{ text }}
  </p>
</template>
