<script lang="ts" setup>
const { locale } = useI18n();

const props = defineProps<{
  withInfoItems?: true;
}>();

const { items_view } = storeToRefs(await useInitializedBlogStore());

const hot_items_by_lang = computed(() => {
  return items_view.value.filter((item) => {
    const isLocalDeletedByAdmin = item.modified === "deleted";
    const isHiPriority = item.priority == "High";
    const correspondingLang = locale.value == item.lang;
    return isHiPriority && !isLocalDeletedByAdmin && correspondingLang;
  });
});

const hot_items_slice = computed(() => hot_items_by_lang.value.slice(0, 4));

// const test = computed(() => []);
// const test = computed(() => [...hot_items_slice.value]);
// const test = computed(() => [...hot_items_slice.value, ...hot_items_slice.value]);
// const test = computed(() => [...hot_items_slice.value, ...hot_items_slice.value, ...hot_items_slice.value]);
// const test = computed(() => [
//   ...hot_items_slice.value,
//   ...hot_items_slice.value,
//   ...hot_items_slice.value,
//   ...hot_items_slice.value,
// ]);
</script>
<template>
  <div class="border-D-t border-D-s hidden flex-wrap md:flex">
    <BlogItemText v-if="withInfoItems" />

    <BlogItemHot v-for="item in hot_items_slice" :item="item" />

    <BlogItemAllArticles v-if="withInfoItems" />
  </div>

  <div :class="[`border-M-s border-M-t border-M-e flex flex-col border-white md:hidden`]">
    <BlogItemAllArticles v-if="withInfoItems" />

    <BlogItemHot v-for="item in hot_items_slice" :item="item" mobile />
  </div>
</template>
