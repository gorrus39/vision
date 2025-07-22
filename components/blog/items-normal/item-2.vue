<script setup lang="ts">
import type { BlogItem } from "~/types/blog"
import type { FullFaqItem } from "~/types/faq"
const localePath = useLocalePath()
import { getBlogImageUrl } from "~/utils/blog"

const props = defineProps<{
  item: BlogItem | FullFaqItem
  imgPosition: "left" | "right"
  imgMaxWidthStyle: string
  width?: string
  isFaqItems?: true
}>()

// const availibleImagePositions: ("right" | "left")[] = ["right", "left"];

// const imagePosionIndex = () => {
//   return Math.floor(Math.random() * availibleImagePositions.length);
// };

// const imgMaxWidth = () => {
//   return Math.floor(Math.random() * 10) + 15;
// };

// const maxWidth = `${imgMaxWidth()}vw`;

// const imgPosition = availibleImagePositions[imagePosionIndex()];

const style: { [key: string]: any } = {}
if (props.width) {
  style.width = props.width
} else {
  style.flexGrow = 1
}

const item = props.item
const titleImgSrc = item.images[0] && getImagePath(item.images[0])
</script>

<template>
  <div class="border-D-e border-D-s border-D-b gap-D-20 p-D-29 flex border-white" :style="style">
    <img
      class="h-auto object-cover"
      v-if="titleImgSrc && imgPosition === 'left'"
      :style="{ maxWidth: imgMaxWidthStyle }"
      :src="titleImgSrc"
    />

    <div class="flex flex-1 flex-col">
      <div class="gap-D-10 mb-D-34 flex flex-wrap justify-between">
        <div class="text-D-22" v-if="'published_at' in item">
          {{ formatDate(new Date(item.published_at)) }}
        </div>
        <div :class="['border-D pt-D-2 ps-D-10 pe-D-10 text-D-18 w-max rounded-[2vw] border-white']">
          {{ item.category }}
        </div>
      </div>

      <p :class="['font-bebas-neue mb-D-38 text-D-52']">
        {{ item.title }}
      </p>

      <p
        v-html="item.text"
        :class="['formatted-text mb-D-18 text-D-24 leading-D-36 max-h-[10vw] overflow-hidden']"
        style="
          mask-image: linear-gradient(to bottom, black 10%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, black 10%, transparent);
        "
      />
      <ChanksButtonShowMore :path="isFaqItems ? `/faq/${item.id}` : `/blog/${item.id}`" />
    </div>

    <img
      class="h-auto object-cover"
      v-if="titleImgSrc && imgPosition === 'right'"
      :style="{ maxWidth: imgMaxWidthStyle }"
      :src="titleImgSrc"
    />
  </div>
</template>

<style scoped>
.formatted-text {
  white-space: pre-wrap;
}
</style>
