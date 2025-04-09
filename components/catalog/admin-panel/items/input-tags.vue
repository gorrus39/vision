<script setup lang="ts">
import _ from "lodash";
import type { Tag } from "~/types/catalog";

const tagsString = defineModel<string>();

const toggleTag = (tag: Tag) => {
  const tagsNow = getTagsFromString(tagsString.value);

  if (tagsNow.includes(tag)) {
    const tagsWithoutElement = _.without(tagsNow, tag);
    tagsString.value = JSON.stringify(tagsWithoutElement);
  } else {
    tagsNow.push(tag);
    tagsString.value = JSON.stringify(tagsNow);
  }
};

const availibleTags: Tag[][] = [
  ["kozmap", "oracle"],
  ["english", "russian", "chinese", "spanish", "french"],
  ["chat", "markets", "forums", "top sellers", "essentials", "others"],
];

const tagsArray = computed<Tag[]>(() => getTagsFromString(tagsString.value));
</script>
<template>
  <div class="space-y-2">
    <div class="flex gap-2" v-for="tagLine in availibleTags">
      <span
        v-for="tag in tagLine"
        @click="toggleTag(tag)"
        :class="[
          'cursor-pointer rounded px-2 py-1',
          tagsArray.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-200 text-white',
        ]"
        >{{ tag }}</span
      >
    </div>
  </div>
</template>
