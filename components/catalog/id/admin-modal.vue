<script setup lang="ts">
import type { CatalogAdmin } from "~/types/catalog"

defineProps<{
  admin: CatalogAdmin
}>()
</script>

<template>
  <UModal>
    <div class="relative">
      <NuxtImg class="absolute z-0 h-full w-full" src="images/default/catalog-item-img-short/background-white.png" />

      <div class="gap-D-20 me-D-20 ms-D-20 p-D-30 relative z-10 flex flex-col items-center text-black">
        <img class="w-M-40 h-M-40 md:w-D-96 md:h-D-96 z-10 rounded-full" :src="getImagePath(admin.images[0])" />

        <p class="text-M-16 md:text-D-40">{{ admin.name }}</p>

        <p class="text-D-20 hidden md:block">{{ admin.description }}</p>

        <UButton :to="admin.link" block :label="$t('catalog.id.admin.view_account')" color="neutral" />
      </div>
    </div>
  </UModal>
</template>
