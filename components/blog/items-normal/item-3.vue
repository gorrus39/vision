<script setup lang="ts">
import type { BlogItem } from "~/types/all";
const localePath = useLocalePath();
const toast = useToast();
import { getBlogImageUrl } from "~/server/utils/helpers/blog";

// const props = defineProps<{
//   item: BlogItem;
// }>();
</script>

<template></template>

<style scoped>
/* bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 */
.button-gradient {
  background: linear-gradient(to left, #c6c6c6, #ffffff 15%, #c6c6c6 26%, #848181);
}

.formatted-text {
  white-space: pre-wrap;
}
</style>
