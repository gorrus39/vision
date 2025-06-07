<script setup lang="ts">
import type { CatalogAdmin } from "~/types/catalog"
import CatalogIdAdminModal from "~/components/catalog/id/admin-modal.vue"
// const modal = useModal()

const props = defineProps<{
  admin: CatalogAdmin
}>()

const openModal = () => {
  // modal.open(CatalogIdAdminModal, { admin: props.admin })
}
</script>

<template>
  <div
    class="on-hover md:w-D-350 relative flex w-full flex-col overflow-hidden rounded-xl border border-solid border-white md:rounded-md md:border-[.5px]"
    @click="openModal"
  >
    <NuxtImg class="absolute h-full w-full" src="images/default/catalog-item-img-short/background-black.png" />

    <div class="m-M-10 md:m-D-20 relative z-10">
      <NuxtImg class="w-M-20 h-M-20 md:w-D-30 md:h-D-30 ms-auto" src="/images/home/arrow-link.svg" />
      <div class="gap-M-15 md:gap-D-26 flex items-center">
        <img class="w-M-35 h-M-35 md:w-D-60 md:h-D-60 rounded-full" :src="getCatalogAdminImageUrl(admin.avatar_path)" />
        <div class="flex flex-1 flex-col">
          <p class="text-M-12 md:text-D-26 font-semibold">{{ admin.name }}</p>
          <p class="text-M-10 md:text-D-20">{{ admin.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
