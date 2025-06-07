<script setup lang="ts">
const model = defineModel<string | number | undefined>({ required: true })
defineProps<{ placeholder: string }>()
</script>

<template>
  <UTextarea v-model="model" placeholder="" :ui="{ base: 'peer', root: 'mt-4' }">
    <label
      class="text-highlighted peer-focus:text-highlighted peer-placeholder-shown:text-dimmed pointer-events-none absolute -top-4.5 left-0 px-1.5 text-xs font-medium transition-all peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:-top-4.5 peer-focus:text-xs peer-focus:font-medium"
    >
      <span class="inline-flex bg-none px-1">{{ placeholder }}</span>
    </label>
  </UTextarea>
</template>
