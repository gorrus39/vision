<script setup lang="ts">
const { user, clear, loggedIn } = useUserSession()
const loading = ref(false)
</script>

<template>
  <div class="hidden h-96 flex-1 items-center justify-center gap-4 md:flex">
    <a v-if="!loggedIn" href="/api/auth/github" @click="loading = true">
      <u-button :loading icon="i-carbon-logo-github" label="login via github" />
    </a>

    <u-button v-else :label="`logout ${user && 'email' in user && user.email}`" @click="clear" />
  </div>
</template>
