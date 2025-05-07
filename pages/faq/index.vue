<script setup lang="ts">
import { FaqAdminModalMain } from "#components"
import { iconPaths } from "~/assets/icon-paths"

const modal = useModal()

modal.open(FaqAdminModalMain)
</script>

<template>
  <div class="x-mx hidden md:block">
    <u-button :icon="iconPaths.settings" size="sm" @click="modal.open(FaqAdminModalMain)" label="Admin - F.A.Q." />
  </div>
</template>
