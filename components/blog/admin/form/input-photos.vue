<script setup lang="ts">
import type { BlogItem } from "~/types/blog";
import { getBlogImageUrl } from "~/utils/blog";

const item = defineModel<BlogItem>();

const maxPhotoAmount = 5;
const image_paths = computed(() => {
  return item.value?.image_paths.filter((path) => path !== null) || [];
});

const handleCancelPhoto = (index: number) => {
  if (!item.value) return;

  item.value.image_paths.splice(index, 1);
  item.value.image_paths.push(null);

  item.value.files!.splice(index, 1);
  item.value.files!.push(null);

  const input = document.querySelector("input[type='file']") as HTMLInputElement;
  if (input) input.value = "";
};

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const file = target.files[0];
  if (!file || !item.value) return;

  if (image_paths.value.length >= maxPhotoAmount) return;

  const firstAvailibleIndex = item.value.image_paths.indexOf(null);

  item.value.image_paths[firstAvailibleIndex] = URL.createObjectURL(file);

  const files = item.value.files || [];
  files[firstAvailibleIndex] = file;
};
</script>

<template>
  <div class="space-y-4" v-if="item">
    <div class="flex gap-2">
      <label class="block cursor-pointer">
        <UButton as="span" color="primary" variant="solid">Choose photo</UButton>
        <input class="hidden" type="file" accept="image/*" @change="onFileChange" />
      </label>
    </div>

    <div class="mt-4 grid grid-cols-3 gap-4" v-if="item?.image_paths">
      <div class="group relative" v-for="(image, index) in image_paths" :key="index">
        <img
          class="h-48 w-48 rounded-lg border object-cover shadow-md"
          :class="{ 'border-4 border-blue-500': index === 0 }"
          :src="getBlogImageUrl(image)"
          :alt="`Photo ${index + 1}`"
        />
        <UButton
          class="absolute right-1 top-1 opacity-0 transition group-hover:opacity-100"
          color="red"
          variant="outline"
          size="xs"
          @click="handleCancelPhoto(index)"
        >
          ✕
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:hover .opacity-0 {
  opacity: 1;
}
</style>
