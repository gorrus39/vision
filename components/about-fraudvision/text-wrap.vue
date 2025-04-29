<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <slot>
    <p class="text-M-16 md:text-D-38">
      {{ text }}
    </p>
  </slot>
</template>
