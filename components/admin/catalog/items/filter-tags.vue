<script setup lang="ts">
import _ from "lodash"
import type { Tag } from "~/types/catalog"

const selectedTags = defineModel<Tag[]>()

defineProps<{
  availibleTags: Tag[][]
}>()

const toggleTag = (tag: Tag) => {
  if (!selectedTags.value) return

  const index = selectedTags.value.indexOf(tag)

  if (index >= 0) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-6" v-if="selectedTags">
    <div class="flex gap-2" v-for="tagLine in availibleTags">
      <span
        v-for="tag in tagLine"
        @click="toggleTag(tag)"
        :class="[
          'w-max cursor-pointer rounded px-2 py-1',
          selectedTags.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-200 text-white',
        ]"
        >{{ tag }}</span
      >
    </div>
  </div>
</template>
