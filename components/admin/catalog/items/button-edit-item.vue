<script setup lang="ts">
import type { FullCatalogItem } from "~/types/catalog"

const { ui } = useAppConfig()
defineProps<{
  item: FullCatalogItem
}>()

const showForm = ref(false)
</script>

<template>
  <UIcon class="on-hover h-5 w-5" :name="ui.iconsExt.edit" />
  <admin-catalog-items-form v-model:show-form.edit="showForm" :item />
</template>
