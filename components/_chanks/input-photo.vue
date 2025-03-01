<script setup>
import { ref } from "vue";

const preview = ref(null);

const onFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Создаем превью
  if (preview.value) {
    URL.revokeObjectURL(preview.value); // Очищаем старое превью
  }
  preview.value = URL.createObjectURL(file);

  // Подготовка FormData
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", "home/1-title");

  try {
    const response = await $fetch("/api/photo", {
      method: "POST",
      body: formData,
    });
    console.log("Upload success:", response);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
</script>

<template>
  <div class="space-y-4">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-black">Загрузите фото</h3>
      </template>

      <label class="block cursor-pointer">
        <UButton as="span" color="primary" variant="solid"
          >Выбрать файл</UButton
        >
        <input
          class="hidden"
          type="file"
          accept="image/*"
          @change="onFileChange"
        />
      </label>

      <div class="mt-4" v-if="preview">
        <img
          class="h-48 w-48 rounded-lg object-cover text-black shadow-md"
          :src="preview"
          alt="Превью"
        />
      </div>
    </UCard>
  </div>
</template>
