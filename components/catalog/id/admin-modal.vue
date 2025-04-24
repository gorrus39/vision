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

      <div class="relative z-10 flex flex-col items-center text-black gap-D-20 me-D-20 ms-D-20 p-D-30">
        <img class="z-10 rounded-full w-D-96 h-D-96" :src="getCatalogAdminImageUrl(admin.avatar_path)" />

        <p class="text-D-40">{{ admin.name }}</p>

        <p class="text-D-20">{{ admin.description }}</p>

        <UButton :to="admin.link" block :label="$t('catalog.id.admin.view_account')" color="black" />
      </div>
    </div>
  </UModal>
</template>
