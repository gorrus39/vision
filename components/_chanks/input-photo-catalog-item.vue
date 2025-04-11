<script setup lang="ts">
import type { CatalogAdmin, FullCatalogItem } from "~/types/catalog";
const item = defineModel<FullCatalogItem>();

const props = defineProps<{
  photoShort?: true;
}>();

const inputRef = ref<null | HTMLInputElement>(null);

const handleCancelPhoto = () => {
  if (!item.value) return;

  if (props.photoShort) {
    item.value.img_short_path = "";
    item.value.frontendFileShort = undefined;
  } else {
    item.value.img_large_path = "";
    item.value.frontendFileLarge = undefined;
  }

  if (inputRef.value !== null) inputRef.value.value = "";
};

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const file = target.files[0];
  if (!file || !item.value) return;

  if (props.photoShort) {
    item.value.img_short_path = URL.createObjectURL(file);
    item.value.frontendFileShort = file;
  } else {
    item.value.img_large_path = URL.createObjectURL(file);
    item.value.frontendFileLarge = file;
  }
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

    <div class="mt-4" v-if="photoShort && item?.img_short_path?.length && item?.img_short_path?.length > 0">
      <img
        class="w-48 rounded-lg border object-cover shadow-md"
        :src="getCatalogItemImageUrl(item.img_short_path)"
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

    <div class="mt-4" v-if="!photoShort && item?.img_large_path?.length && item?.img_large_path?.length > 0">
      <img
        class="rounded-lg border object-cover shadow-md w-D-400"
        :src="getCatalogItemImageUrl(item.img_large_path)"
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
