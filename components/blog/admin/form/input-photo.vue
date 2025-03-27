<script setup lang="ts">
import type { BlogItem } from "~/types/blog";
import { getBlogImageUrl } from "~/server/utils/helpers/blog";

const model = defineModel<BlogItem>();
const handleCancelPhoto = () => {
  if (!model.value) return;

  model.value.image_paths = null;
  delete model.value.file;

  // Очищаем инпут, чтобы можно было загрузить тот же файл снова
  const input = document.querySelector("input[type='file']") as HTMLInputElement;
  if (input) input.value = "";

  // preview.value = null;
};

// TODO:
// когда добавил фото, нажал отмену фото
// при добавлении этого же фото - оно не добавляется, по карйней мере не отображается в превью

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement; // ⬅ Приводим к HTMLInputElement
  if (!target.files) return;

  const file = target.files[0];

  if (!file) return;
  if (!model.value) return;
  // Очищаем старое превью
  // if (preview.value) URL.revokeObjectURL(preview.value);
  // Создаем превью
  // preview.value = URL.createObjectURL(file);

  model.value.image_paths = URL.createObjectURL(file);
  model.value.file = file;
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <label class="block cursor-pointer">
        <UButton as="span" color="primary" variant="solid">Choose photo</UButton>
        <input class="hidden" type="file" accept="image/*" @change="onFileChange" />
      </label>

      <UButton v-if="model?.image_paths" color="red" variant="outline" @click="handleCancelPhoto">
        cancel photo
      </UButton>
    </div>

    <div class="mt-4" v-if="model?.image_paths">
      <img
        class="h-48 w-48 rounded-lg object-cover text-black shadow-md"
        :src="getBlogImageUrl(model?.image_paths)"
        alt="preview photo"
      />
    </div>
  </div>
</template>
