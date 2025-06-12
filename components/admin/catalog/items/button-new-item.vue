<script setup lang="ts">
const { ui } = useAppConfig()

const showForm = ref(true)
</script>

<template>
  <UButton @click="showForm = true" :icon="ui.iconsExt.add" label="Add item" />

  <admin-catalog-items-form v-model:show-form.new="showForm" />
</template>
