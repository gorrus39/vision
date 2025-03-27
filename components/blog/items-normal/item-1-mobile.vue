<script setup lang="ts">
import type { BlogItem } from "~/types/blog";
const localePath = useLocalePath();
import { getBlogImageUrl } from "~/server/utils/helpers/blog";

const props = defineProps<{
  item: BlogItem;
}>();
</script>

<template>
  <div :class="['border-M-b border-D-b flex flex-col border-white p-M-7']">
    <div :class="['flex flex-wrap justify-between mb-M-21']">
      <div :class="['text-M-16']">
        {{ formatDate(item.published_at) }}
      </div>
      <div :class="['border-M rounded-[5vw] border-white ps-M-10 pe-M-10 text-M-14']">
        {{ item.category }}
      </div>
    </div>

    <p :class="['font-bebas-neue mb-M-10 text-M-32']">
      {{ item.title }}
    </p>

    <p
      v-html="item.text"
      :class="['formatted-text max-h-[50vw] overflow-hidden mb-M-14 text-M-16 leading-M-24']"
      style="
        mask-image: linear-gradient(to bottom, black 10%, transparent);
        -webkit-mask-image: linear-gradient(to bottom, black 10%, transparent);
      "
    />
    <!-- {{ blogItem.text }}
    </p> -->

    <div class="flex flex-col gap-2" v-if="item.image_paths[0]">
      <img class="mb-M-10 md:mb-D-20" :src="getBlogImageUrl(item.image_paths[0])" />
    </div>

    <ChanksButtonShowMore :path="`/blog/${item.id}`" />
  </div>
</template>

<style scoped>
.formatted-text {
  white-space: pre-wrap;
}
</style>
