<script setup lang="ts">
import _ from "lodash"
import type { Tag } from "~/types/catalog"

const tags = defineModel<string[]>({ required: true })

const toggleTag = (tag: Tag) => {
  if (tags.value.includes(tag)) {
    const tagsWithoutElement = _.without(tags.value, tag)
    tags.value = tagsWithoutElement
  } else {
    tags.value.push(tag)
  }
}

const availibleTags: Tag[][] = [
  ["kozmap", "oracle"],
  ["english", "russian", "chinese", "spanish", "french"],
  ["chat", "markets", "forums", "top sellers", "essentials", "others"],
]
</script>
<template>
  <div class="space-y-2">
    <div class="flex gap-2" v-for="tagLine in availibleTags">
      <span
        v-for="tag in tagLine"
        @click="toggleTag(tag)"
        :class="[
          'cursor-pointer rounded px-2 py-1',
          tags.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-200 text-white',
        ]"
        >{{ tag }}</span
      >
    </div>
  </div>
</template>
