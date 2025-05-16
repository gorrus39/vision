<script setup lang="ts">
import { FaqAdminModalMain } from "#components"
import { iconPaths } from "~/assets/icon-paths"

const modal = useModal()
const openModal = () => modal.open(FaqAdminModalMain)
</script>

<template>
  <div class="hidden p-2 md:block">
    <u-button :icon="iconPaths.settings" size="sm" @click="openModal" label="Admin - F.A.Q." />
  </div>

  <faq-list-1-title />
  <faq-list-2-items-important />
  <faq-list-3-items-normal />
</template>
