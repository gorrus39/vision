<script setup lang="ts">
import { getBlogImageUrl } from "~/server/utils/helpers/blog";

const { items_view } = storeToRefs(useInitializedBlogStore());

const hot_items = computed(() => {
  return items_view.value.filter((item) => {
    const isLocalDeletedByAdmin = item.modified === "deleted";
    const isHiPriority = item.priority == "High";
    return isHiPriority && !isLocalDeletedByAdmin;
  });
});

const hot_items_desktop_limited = computed(() => hot_items.value.slice(0, 3));
const hot_items_mobile_limited = computed(() => hot_items.value.slice(0, 4));
</script>

<template>
  <div class="mb-M-80 me-D-155 ms-D-156 md:mb-D-95">
    <div class="flex gap-M-5 md:gap-D-10">
      <p class="font-bebas-neue text-M-36 md:text-D-62">HOT NEWS</p>
      <NuxtImg class="w-M-18 md:w-D-34" src="images/blog/fire.svg" />
    </div>

    <div
      :class="[
        `border-D-s border-D-t border-D-b hidden md:grid grid-cols-${hot_items_desktop_limited.length} border-white`,
      ]"
    >
      <HomeBlogItemCopy
        v-for="item in hot_items_desktop_limited"
        :blogItem="item"
        hotItem
      />
    </div>

    <div
      :class="[
        `border-M-s border-M-t border-M-e flex flex-col border-white md:hidden`,
      ]"
    >
      <HomeBlogItemCopy
        v-for="item in hot_items_mobile_limited"
        :blogItem="item"
        mobile
        hotItem
      />
    </div>
  </div>
</template>
