<script setup lang="ts">
import { getBlogImageUrl } from "~/server/utils/helpers/blog";

const { items_view } = storeToRefs(useInitializedBlogStore());

const items = computed(() => {
  return items_view.value.filter((item) => {
    const isLocalDeletedByAdmin = item.modified === "deleted";
    const isHiPriority = item.priority == "Low";
    return isHiPriority && !isLocalDeletedByAdmin;
  });
});

// const hot_items_desktop_limited = computed(() => items.value.slice(0, 3));
// const hot_items_mobile_limited = computed(() => items.value.slice(0, 4));
</script>

<template>
  <div class="mb-M-83 me-D-155 ms-D-156 md:mb-D-183">
    <div
      :class="[
        `border-D-s border-D-t border-D-b hidden grid-cols-2 border-white md:grid`,
      ]"
    >
      <HomeBlogItemCopy v-for="item in items" :blogItem="item" />
    </div>

    <div
      :class="[
        `border-M-s border-M-t border-M-e flex flex-col border-white md:hidden`,
      ]"
    >
      <HomeBlogItemCopy v-for="item in items" :blogItem="item" mobile />
    </div>
  </div>
</template>
