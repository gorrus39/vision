<script setup lang="ts">
import type { Lang } from "~/types/catalog"

defineProps<{
  loading: boolean
  lang: Lang
  disabled?: boolean
}>()

const open = ref(false)
</script>

<template>
  <USlideover v-model:open="open" title="New F.A.Q. item">
    <UButton color="secondary" label="New F.A.Q. item" :disabled="loading || disabled" @click="open = true" />

    <template #body>
      <admin-chanks-form :itemId="null" @close-form="open = false" :lang />
    </template>
  </USlideover>
</template>
