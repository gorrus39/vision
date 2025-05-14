<script setup lang="ts">
import type { FullFaqItem } from "~/types/faq"

defineProps<{
  item: FullFaqItem
}>()

const showForm = ref(false)

const openForm = () => {
  showForm.value = true
}
</script>

<template>
  <u-slideover v-model="showForm">
    <faq-admin-form :item @close-form="showForm = false" />
  </u-slideover>
  <UIcon class="on-hover" name="i-heroicons-pencil-square" @click="openForm" />
</template>
