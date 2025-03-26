<script setup lang="ts">
import type { BlogItem } from "~/types/all";
const localePath = useLocalePath();
import { getBlogImageUrl } from "~/server/utils/helpers/blog";

const props = defineProps<{
  item: BlogItem;
}>();
</script>

<template>
  <div class="border-D-e border-D-s border-D-b flex border-white gap-D-20 p-D-29">
    <div :class="['flex flex-1 flex-col']">
      <div :class="['flex justify-between mb-D-34']">
        <div class="text-D-22">
          {{ formatDate(item.published_at) }}
        </div>
        <div :class="['border-D rounded-[2vw] border-white pt-D-2 ps-D-10 pe-D-10 text-D-18']">
          {{ item.category }}
        </div>
      </div>

      <p :class="['font-bebas-neue mb-D-38 text-D-52']">
        {{ item.title }}
      </p>

      <p
        v-html="item.text"
        :class="['formatted-text max-h-[10vw] overflow-hidden mb-D-18 text-D-24 leading-D-36']"
        style="
          mask-image: linear-gradient(to bottom, black 10%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, black 10%, transparent);
        "
      />

      <UButton
        :class="['button-gradient on-hover mt-auto rounded-[.5vw] p-D-10 text-D-22']"
        :to="localePath(`/blog/${props.item.id}`)"
        :label="$t('home.vision_blog.show_more')"
        block
      />
    </div>

    <img class="max-w-[30vw]" v-if="item.image_paths[0]" :src="getBlogImageUrl(item.image_paths[0])" />
  </div>
</template>

<style scoped>
/* bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 */
.button-gradient {
  background: linear-gradient(to left, #c6c6c6, #ffffff 15%, #c6c6c6 26%, #848181);
}

.formatted-text {
  white-space: pre-wrap;
}
</style>
