<script setup lang="ts">
import { getBlogImageUrl } from "~/server/utils/helpers/blog";

const { items_view, items_admin, items_origin } = storeToRefs(
  useInitializedBlogStore(),
);

const hot_items = computed(() => {
  return items_view.value.filter((item) => {
    const isLocalDeletedByAdmin = item.modified === "deleted";
    const isHiPriority = item.priority == "High";
    return isHiPriority && !isLocalDeletedByAdmin;
  });
});
</script>

<template>
  <h1>hot_items.length: {{ hot_items.length }}</h1>
  <div class="flex w-full flex-wrap">
    <div v-for="item in hot_items">
      <p>{{ item.title }}</p>
      <p>{{ item.text }}</p>

      <img
        class="w-D-100 h-D-100"
        v-if="item.img"
        :src="getBlogImageUrl(item.img)"
        alt=""
      />
    </div>
  </div>
</template>
