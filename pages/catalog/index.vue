<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>

<template>
  <CatalogAdminPanelEntryPoint v-if="loggedIn" />
  <CatalogMain />
</template>
