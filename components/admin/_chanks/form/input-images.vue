<script setup lang="ts">
import type { Image, ImageReferType } from "~/types/common"

const {
  maxAmount = 5,
  refer_type,
  canTitle = true,
} = defineProps<{
  maxAmount?: number
  refer_type: ImageReferType
  canTitle?: false
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
    path: URL.createObjectURL(file),
    frontendFile: file,
    fileName: file.name,
    fileType: file.type,
    refer_type: refer_type,
  }
  photos.value.push(item)
}
</script>

<template>
  <div class="flex gap-2">
    <input class="hidden" ref="inputRef" type="file" accept="image/*" @change="onFileChange" />

    <UButton class="h-48" @click="inputRef?.click()" :disabled="photos.length >= maxAmount" color="secondary">
      <span v-if="photos.length >= maxAmount">
        Max <br />
        images <br />amount
      </span>
      <span v-else>
        Choose <br />
        image
      </span>
    </UButton>

    <div class="flex cursor-pointer flex-wrap gap-4">
      <div
        class="relative h-48 w-48 overflow-hidden rounded-lg border-[5px] shadow-md"
        v-for="(photo, index) in photos"
        @click="canTitle ? (photo.is_title = !photo.is_title) : () => {}"
        :class="photo.is_title ? 'border-primary-700' : 'border-white'"
        title="toggle is_title"
      >
        <img class="h-full w-full object-cover" :src="getImagePath(photo)" alt="Photo" />
        <UButton
          class="absolute top-1 right-1"
          color="error"
          variant="outline"
          size="xs"
          @click="handleCancelPhoto(index)"
          label="✕"
        />
      </div>
    </div>
  </div>
</template>
