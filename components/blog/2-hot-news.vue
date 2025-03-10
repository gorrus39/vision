<script setup lang="ts">
// import { useBlogStore } from "~/stores/blog";
// import { storeToRefs } from "pinia";

const { origin_or_preview_items, admin_items, original_items } =
  storeToRefs(useBlogStore());

const origin_or_preview_items_without_deleted = computed(() => {
  return origin_or_preview_items.value.filter(
    (item) => item.modified !== "deleted",
  );
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
      <p>admin_items:</p>
      <p v-for="item in admin_items">
        {{ item.id }}
      </p>
      <hr />
      <p>original_items:</p>
      <p v-for="item in original_items">
        {{ item.id }}
      </p>
      <hr />
    </div>
  </div>
</template>
