<script setup lang="ts">
import type { BlogItem } from "~/types/blog"
import type { FullFaqItem } from "~/types/faq"
const localePath = useLocalePath()

defineProps<{
  item: BlogItem | FullFaqItem
  mobile?: true
  faq?: true
}>()
</script>

<template>
  <div
    :class="[
      'border-D-b flex min-w-[27vw] flex-1 flex-col border-white',
      mobile ? 'border-M-b p-M-7' : 'border-D-e p-D-29',
    ]"
  >
    <div :class="['flex flex-wrap justify-between', mobile ? 'mb-M-21' : 'mb-D-34']">
      <div v-if="'published_at' in item" :class="[mobile ? 'text-M-16' : 'text-D-22']">
        {{ formatDate(new Date(item.published_at)) }}
      </div>
      <div
        :class="[
          'border-white',
          mobile
            ? 'border-M ps-M-10 pe-M-10 text-M-14 rounded-[5vw]'
            : 'border-D pt-D-2 ps-D-10 pe-D-10 text-D-18 rounded-[2vw]',
        ]"
      >
        {{ item.category }}
      </div>
    </div>

    <p :class="['font-bebas-neue', mobile ? 'mb-M-10 text-M-32' : 'mb-D-38 text-D-52']">
      {{ item.title }}
    </p>

    <div
      v-html="item.text"
      :class="[
        'formatted-text',
        mobile
          ? 'mb-M-14 text-M-16 leading-M-24 max-h-[50vw] overflow-hidden'
          : 'mb-D-18 text-D-24 leading-D-36 max-h-[10vw] overflow-hidden',
      ]"
      style="
        mask-image: linear-gradient(to bottom, black 10%, transparent);
        -webkit-mask-image: linear-gradient(to bottom, black 10%, transparent);
      "
    ></div>
    <!-- поменять это на что-то другое -->
    <!-- <NuxtLinkLocale
      :to="`/blog/${item.id}`"
      :class="[
        'button-gradient on-hover w-full text-center',
        mobile ? 'rounded-[1vw] p-M-5 text-M-16' : 'mt-auto rounded-[.5vw] p-D-10 text-D-22',
      ]"
    >
      {{ $t("home.vision_blog.show_more") }}
    </NuxtLinkLocale> -->

    <ChanksButtonShowMore :path="faq ? `/faq/${item.id}` : `/blog/${item.id}`" />
  </div>
</template>

<style scoped>
.formatted-text {
  white-space: pre-wrap;
}
</style>
