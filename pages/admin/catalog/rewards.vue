<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>
<template><div v-if="loggedIn">sdf</div></template>
