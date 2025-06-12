<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>
<template>
  <UContainer class="text-center font-bold">Catalog Rewards</UContainer>
  <admin-catalog-rewards />
</template>
