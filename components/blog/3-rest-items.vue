<script setup lang="ts">
import { get_items_by_lang } from "~/server/utils/helpers/blog";

const { locale } = useI18n();

const { items_view } = storeToRefs(useInitializedBlogStore());

const items_by_lang = computed(() => {
  return get_items_by_lang(items_view, locale);
});
</script>

<template>
  <div class="mb-M-83 me-D-155 ms-D-156 md:mb-D-183">
    <div :class="[`border-D-s border-D-t border-D-b hidden grid-cols-2 border-white md:grid`]">
      <HomeBlogItemCopy v-for="item in items_by_lang" :blogItem="item" />
    </div>

    <div :class="[`border-M-s border-M-t border-M-e flex flex-col border-white md:hidden`]">
      <HomeBlogItemCopy v-for="item in items_by_lang" :blogItem="item" mobile />
    </div>
  </div>
</template>
