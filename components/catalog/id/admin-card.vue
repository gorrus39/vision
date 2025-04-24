<script setup lang="ts">
import type { CatalogAdmin } from "~/types/catalog"
import CatalogIdAdminModal from "~/components/catalog/id/admin-modal.vue"
const modal = useModal()

const props = defineProps<{
  admin: CatalogAdmin
}>()

const openModal = () => {
  modal.open(CatalogIdAdminModal, { admin: props.admin })
}
</script>

<template>
  <div
    class="on-hover relative flex w-full flex-col overflow-hidden rounded-xl border-[1px] border-solid border-white md:rounded-md md:border-[.5px] md:w-D-350"
    @click="openModal"
  >
    <NuxtImg class="absolute h-full w-full" src="images/default/catalog-item-img-short/background-black.png" />

    <div class="relative z-10 m-M-10 md:m-D-20">
      <NuxtImg class="ms-auto w-M-20 h-M-20 md:w-D-30 md:h-D-30" src="/images/home/arrow-link.svg" />
      <div class="flex items-center gap-M-15 md:gap-D-26">
        <img class="rounded-full w-M-35 h-M-35 md:w-D-60 md:h-D-60" :src="getCatalogAdminImageUrl(admin.avatar_path)" />
        <div class="flex flex-1 flex-col">
          <p class="font-semibold text-M-12 md:text-D-26">{{ admin.name }}</p>
          <p class="text-M-10 md:text-D-20">{{ admin.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
