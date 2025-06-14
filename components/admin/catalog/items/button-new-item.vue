<script setup lang="ts">
const { ui } = useAppConfig()

const showForm = ref(false)
</script>

<template>
  <UButton @click="showForm = true" :icon="ui.iconsExt.add" label="Add item" />

  <admin-catalog-items-form v-if="showForm" v-model:show-form.new="showForm" />
</template>
