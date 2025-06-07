<script setup lang="ts">
const model = defineModel<string | number | undefined>({ required: true })
defineProps<{ placeholder: string }>()
</script>

<template>
  <UInput v-model="model" placeholder="" :ui="{ base: 'peer' }">
    <label
      class="text-highlighted peer-focus:text-highlighted peer-placeholder-shown:text-dimmed pointer-events-none absolute -top-2.5 left-0 px-1.5 text-xs font-medium transition-all peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:-top-2.5 peer-focus:text-xs peer-focus:font-medium"
    >
      <span class="bg-default inline-flex px-1">{{ placeholder }}</span>
    </label>
  </UInput>
</template>
