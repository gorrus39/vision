<script setup lang="ts">
import type { BlogItem } from "~/types/blog"
import type { FullFaqItem } from "~/types/faq"
const localePath = useLocalePath()
import { getBlogImageUrl } from "~/utils/blog"

const props = defineProps<{
  item: BlogItem | FullFaqItem
  isFaqItems?: true
}>()

const item = props.item as FullFaqItem
const titleImgSrc = item.images[0] && getImagePath(item.images[0])
</script>

<template>
  <div :class="['border-M-b border-D-b p-M-7 flex flex-col border-white']">
    <div :class="['mb-M-21 flex flex-wrap justify-between']">
      <div v-if="'published_at' in item" :class="['text-M-16']">
        {{ item.published_at instanceof Date && formatDate(item.published_at) }}
      </div>
      <div :class="['border-M ps-M-10 pe-M-10 text-M-14 rounded-[5vw] border-white']">
        {{ item.category }}
      </div>
    </div>

    <p :class="['font-bebas-neue mb-M-10 text-M-32']">
      {{ item.title }}
    </p>

    <p
      v-html="item.text"
      :class="['formatted-text mb-M-14 text-M-16 leading-M-24 max-h-[50vw] overflow-hidden']"
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
