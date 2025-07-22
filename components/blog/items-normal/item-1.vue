<script setup lang="ts">
import type { BlogItem } from "~/types/blog"
import type { FullFaqItem } from "~/types/faq"
const localePath = useLocalePath()
import { getBlogImageUrl } from "~/utils/blog"

const props = defineProps<{
  item: BlogItem | FullFaqItem
  isFaqItems?: true
}>()
const item = props.item
const titleImgSrc = item.images[0] && getImagePath(item.images[0])
</script>

<template>
  <div class="border-D-e border-D-s border-D-b gap-D-20 p-D-29 flex border-white">
    <div class="flex flex-1 flex-col">
      <div class="mb-D-34 flex flex-wrap justify-between">
        <div class="text-D-22" v-if="'published_at' in item">
          {{ formatDate(new Date(item.published_at)) }}
        </div>
        <div :class="['border-D pt-D-2 ps-D-10 pe-D-10 text-D-18 rounded-[2vw] border-white']">
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

    <img class="max-w-[30vw] object-cover" v-if="titleImgSrc" :src="titleImgSrc" />
  </div>
</template>

<style scoped>
.formatted-text {
  white-space: pre-wrap;
}
</style>
