<script setup lang="ts">
// import { useBlogStore } from "~/stores/blog";
// import { storeToRefs } from "pinia";

const { items_view, items_admin, items_origin } = storeToRefs(
  useInitializedBlogStore(),
);

const origin_or_preview_items_without_deleted = computed(() => {
  return items_view.value.filter((item) => item.modified !== "deleted");
});
</script>

<template>
  <div class="flex w-full">
    <div class="ms-auto">
      <p>origin_or_preview_items_without_deleted:</p>
      <p v-for="item in origin_or_preview_items_without_deleted">
        {{ item.id }}
      </p>
      <hr />
      <p>items_admin:</p>
      <p v-for="item in items_admin">
        {{ item.id }}
      </p>
      <hr />
      <p>items_origin:</p>
      <p v-for="item in items_origin">
        {{ item.id }}
      </p>
      <hr />
    </div>
  </div>
</template>
