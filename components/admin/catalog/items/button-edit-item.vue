<script setup lang="ts">
import type { FullCatalogItem } from "~/types/catalog"

const { ui } = useAppConfig()
defineProps<{
  id: number | undefined
}>()

const showForm = ref(false)
</script>

<template>
  <UIcon class="on-hover h-5 w-5" @click="showForm = true" :name="ui.iconsExt.edit" />
  <admin-catalog-items-form v-if="showForm" v-model:show-form.edit="showForm" :id />
</template>
