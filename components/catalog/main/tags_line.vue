<script setup lang="ts">
import type { Tag } from "~/types/catalog"

const selectedTag = defineModel<Tag[]>()

const props = defineProps<{
  tags: Tag[]
  title: string
}>()

const select = (tag: Tag) => {
  if (!selectedTag.value) return

  if (!selectedTag.value.includes(tag)) selectedTag.value = [tag]

  // const index = selectedTags.value.indexOf(tag)

  // if (index !== -1) selectedTags.value.splice(index, 1)
  // else selectedTags.value.push(tag)
}
</script>

<template>
  <div>
    <p class="font-secondary text-center mb-M-10 text-M-16 mt-M-20 md:mb-D-10 md:mt-D-30 md:text-D-32">{{ title }}</p>
    <div
      class="flex flex-col justify-between bg-[#1B1B1B] gap-M-14 md:flex-row md:gap-0"
      :class="['md:pt-D-50 md:pb-D-50 md:ps-D-182 md:pe-D-182', 'p-M-30']"
    >
      <div
        v-for="tag in tags"
        :class="[
          'w-auto h-M-50 ps-D-50 pe-D-50 md:h-D-56',
          'on-hover flex items-center justify-center rounded-xl border-[2px] border-solid font-medium md:rounded-lg md:border-[.5px]',
          'text-M-12 md:text-D-24',
          { 'bg-white text-black': selectedTag?.includes(tag) },
          // tags.length > 5 ? 'md:w-D-270' : 'md:w-D-290',
        ]"
        @click="select(tag)"
      >
        {{ $t(`catalog.tags.${tag}`) }}
      </div>
    </div>
  </div>
</template>
