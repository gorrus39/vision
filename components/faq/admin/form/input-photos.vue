<script setup lang="ts">
import type { FaqImage } from "~/types/faq"
type Image = FaqImage

const { maxAmount = 2 } = defineProps<{
  maxAmount?: number
}>()

const photos = defineModel<Image[]>({ required: true })

const inputRef = ref<null | HTMLInputElement>(null)

const handleCancelPhoto = (index: number) => {
  photos.value.splice(index, 1)
  if (inputRef.value) inputRef.value.value = ""
}

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files) return

  const file = target.files[0]
  if (!file) return

  const item: Image = {
    is_title: false,
    pathTemp: URL.createObjectURL(file),
    frontendFile: file,
    fileName: file.name,
    fileType: file.type,
  }
  photos.value.push(item)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <input class="hidden" ref="inputRef" type="file" accept="image/*" @change="onFileChange" />

    <UButton
      @click="inputRef?.click()"
      :disabled="photos.length >= maxAmount"
      color="primary"
      variant="solid"
      :label="photos.length >= maxAmount ? 'Max amount' : 'Choose photo'"
    />
  </div>

  <div class="mt-4 flex cursor-pointer flex-wrap gap-4">
    <div
      class="relative h-48 w-48 overflow-hidden rounded-lg border-[5px] shadow-md"
      v-for="(photo, index) in photos"
      @click="photo.is_title = !photo.is_title"
      :class="{ 'border-blue-700': photo.is_title }"
      title="toggle is_title"
    >
      <img class="h-full w-full object-cover" :src="photo.pathTemp" alt="Photo" />
      <UButton
        class="absolute right-1 top-1"
        color="red"
        variant="outline"
        size="xs"
        @click="handleCancelPhoto(index)"
        label="✕"
      />
    </div>
  </div>
</template>
