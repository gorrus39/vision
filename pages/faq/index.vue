<script setup lang="ts">
import { FaqAdminModalMain } from "#components"
import { iconPaths } from "~/assets/icon-paths"

const modal = useModal()
const openModal = () => modal.open(FaqAdminModalMain)
</script>

<template>
  <div class="x-mx hidden md:block">
    <u-button :icon="iconPaths.settings" size="sm" @click="openModal" label="Admin - F.A.Q." />
  </div>
</template>
