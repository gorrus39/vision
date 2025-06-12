<script setup lang="ts">
import type { StoreType } from "~/types/admin"
import type { Lang } from "~/types/catalog"

defineProps<{
  loading: boolean
  lang: Lang
  disabled?: boolean
}>()

const open = ref(false)

const storeType = inject<StoreType>("storeType", "faqStore")
</script>

<template>
  <USlideover v-model:open="open" :title="`New ${getItemLabel(storeType)} item`">
    <UButton
      color="secondary"
      :label="`New ${getItemLabel(storeType)} item`"
      :disabled="loading || disabled"
      @click="open = true"
    />

    <template #body>
      <admin-chanks-form :itemId="null" @close-form="open = false" :lang />
    </template>
  </USlideover>
</template>
