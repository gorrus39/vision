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
  <div :class="['border-M-b border-D-b flex flex-col border-white p-M-7']">
    <div :class="['flex flex-wrap justify-between mb-M-21']">
      <div v-if="'published_at' in item" :class="['text-M-16']">
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

    <div class="flex flex-col gap-2" v-if="titleImgSrc">
      <img class="mb-M-10 md:mb-D-20" :src="titleImgSrc" />
    </div>

    <ChanksButtonShowMore :path="isFaqItems ? `/faq/${item.id}` : `/blog/${item.id}`" />
  </div>
</template>

<style scoped>
.formatted-text {
  white-space: pre-wrap;
}
</style>
