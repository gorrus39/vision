<script setup lang="ts">
const showMainModal = defineModel<boolean>();
const { locale } = useI18n();
const adminItemsLang = ref<"en" | "ru" | "cn">(locale.value);
</script>

<template>
  <UModal v-model="showMainModal" :ui="{ base: 'p-4 space-y-4' }" fullscreen>
    <BlogAdminInternalBar v-model:showMainModal="showMainModal" v-model:adminItemsLang="adminItemsLang" />

    <BlogAdminTable :adminItemsLang="adminItemsLang" />
  </UModal>
</template>
