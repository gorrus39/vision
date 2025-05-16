<script setup lang="ts">
import type { BlogItem } from "~/types/blog"
import type { FullFaqItem } from "~/types/faq"
const localePath = useLocalePath()
import { getBlogImageUrl } from "~/utils/blog"

const props = defineProps<{
  item: BlogItem | FullFaqItem
  isFaqItems?: true
}>()
let titleImgSrc
if ("images" in props.item) {
  const item = props.item as FullFaqItem
  titleImgSrc = item.images[0] && getFaqImageUrl(item.images[0])
} else {
  const item = props.item as BlogItem
  titleImgSrc = item.image_paths[0] && getBlogImageUrl(item.image_paths[0])
}
</script>

<template>
  <div class="border-D-e border-D-s border-D-b flex border-white gap-D-20 p-D-29">
    <div class="flex flex-1 flex-col">
      <div class="flex flex-wrap justify-between mb-D-34">
        <div class="text-D-22" v-if="'published_at' in item">
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

      <ChanksButtonShowMore :path="isFaqItems ? `/faq/${item.id}` : `/blog/${item.id}`" />
    </div>

    <img class="max-w-[30vw] object-cover" v-if="titleImgSrc" :src="titleImgSrc" />
  </div>
</template>

<style scoped>
.formatted-text {
  white-space: pre-wrap;
}
</style>
