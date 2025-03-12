<script setup lang="ts">
import type { BlogItem } from "~/types/all";
import { getBlogImageUrl } from "~/server/utils/helpers/blog";

const model = defineModel<BlogItem>();
const handleCancelPhoto = () => {
  if (!model.value) return;

  model.value.img = null;
  delete model.value.file;

  // Очищаем инпут, чтобы можно было загрузить тот же файл снова
  const input = document.querySelector(
    "input[type='file']",
  ) as HTMLInputElement;
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

  model.value.img = URL.createObjectURL(file);
  model.value.file = file;
  // // Подготовка FormData
  // const formData = new FormData();
  // formData.append("file", file);
  // formData.append("fileName", "home/1-title");

  // try {
  //   const response = await $fetch("/api/photo", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   console.log("Upload success:", response);
  // } catch (error) {
  //   console.error("Upload failed:", error);
  // }
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <label class="block cursor-pointer">
        <UButton as="span" color="primary" variant="solid"
          >Choose photo</UButton
        >
        <input
          class="hidden"
          type="file"
          accept="image/*"
          @change="onFileChange"
        />
      </label>

      <UButton
        v-if="model?.img"
        color="red"
        variant="outline"
        @click="handleCancelPhoto"
      >
        cancel photo
      </UButton>
    </div>

    <div class="mt-4" v-if="model?.img">
      <img
        class="h-48 w-48 rounded-lg object-cover text-black shadow-md"
        :src="getBlogImageUrl(model?.img)"
        alt="preview photo"
      />
    </div>
  </div>
</template>
