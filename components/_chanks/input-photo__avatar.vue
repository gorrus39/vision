<script setup lang="ts">
import type { CatalogAdmin } from "~/types/catalog";
import { getCatalogAdminImageUrl } from "~/server/utils/helpers/catalog";
const item = defineModel<CatalogAdmin>();

const inputRef = ref<null | HTMLInputElement>(null);

const handleCancelPhoto = () => {
  if (!item.value) return;

  item.value.avatar_path = "";

  item.value.frontendFile = undefined;

  if (inputRef.value !== null) inputRef.value.value = "";
};

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const file = target.files[0];
  if (!file || !item.value) return;

  item.value.avatar_path = URL.createObjectURL(file);
  item.value.frontendFile = file;
};
</script>

<template>
  <div class="space-y-4" v-if="item">
    <div class="flex gap-2">
      <label class="block cursor-pointer">
        <UButton as="span" color="primary" variant="solid">Choose photo</UButton>
        <input class="hidden" ref="inputRef" type="file" accept="image/*" @change="onFileChange" />
      </label>
    </div>

    <div class="mt-4 grid grid-cols-3 gap-4" v-if="item?.avatar_path">
      <img
        class="w-48 rounded-lg border object-cover shadow-md"
        :src="getCatalogAdminImageUrl(item.avatar_path)"
        alt="Photo"
      />
      <UButton
        class="absolute right-1 top-1 opacity-0 transition group-hover:opacity-100"
        color="red"
        variant="outline"
        size="xs"
        @click="handleCancelPhoto()"
      >
        ✕
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.group:hover .opacity-0 {
  opacity: 1;
}
</style>
