<script setup lang="ts">
import type { BlogItem } from "~/types/blog";
const localePath = useLocalePath();
import { getBlogImageUrl } from "~/utils/blog";

const props = defineProps<{
  item: BlogItem;
  imgPosition: "left" | "right";
  imgMaxWidthStyle: string;
  width?: string;
}>();

// const availibleImagePositions: ("right" | "left")[] = ["right", "left"];

// const imagePosionIndex = () => {
//   return Math.floor(Math.random() * availibleImagePositions.length);
// };

// const imgMaxWidth = () => {
//   return Math.floor(Math.random() * 10) + 15;
// };

// const maxWidth = `${imgMaxWidth()}vw`;

// const imgPosition = availibleImagePositions[imagePosionIndex()];

const style: { [key: string]: any } = {};
if (props.width) {
  style.width = props.width;
} else {
  style.flexGrow = 1;
}
</script>

<template>
  <div class="border-D-e border-D-s border-D-b flex border-white gap-D-20 p-D-29" :style="style">
    <img
      class="h-auto object-cover"
      v-if="item.image_paths[0] && imgPosition === 'left'"
      :style="{ maxWidth: imgMaxWidthStyle }"
      :src="getBlogImageUrl(item.image_paths[0])"
    />

    <div class="flex flex-1 flex-col">
      <div class="flex flex-wrap justify-between gap-D-10 mb-D-34">
        <div class="text-D-22">
          {{ formatDate(item.published_at) }}
        </div>
        <div :class="['border-D w-max rounded-[2vw] border-white pt-D-2 ps-D-10 pe-D-10 text-D-18']">
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
      <ChanksButtonShowMore :path="`/blog/${item.id}`" />
    </div>

    <img
      class="h-auto object-cover"
      v-if="item.image_paths[0] && imgPosition === 'right'"
      :style="{ maxWidth: imgMaxWidthStyle }"
      :src="getBlogImageUrl(item.image_paths[0])"
    />
  </div>
</template>

<style scoped>
.formatted-text {
  white-space: pre-wrap;
}
</style>
