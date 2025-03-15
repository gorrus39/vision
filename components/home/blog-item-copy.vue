<script setup lang="ts">
import type { BlogItem } from "~/types/all";
const localePath = useLocalePath();
const toast = useToast();
import { getBlogImageUrl } from "~/server/utils/helpers/blog";

const props = defineProps<{
  blogItem: BlogItem;
  mobile?: true;
  hotItem?: true;
}>();

const handleClickShowMore = () => {
  // toast.add({ title: "Soon!)" });
};
</script>

<template>
  <div
    :class="[
      'flex flex-col border-white',
      mobile ? 'border-M-b p-M-7' : 'border-D-e p-D-29',
      hotItem ? '' : 'border-D-b',
    ]"
  >
    <div :class="['flex justify-between', mobile ? 'mb-M-21' : 'mb-D-34']">
      <div :class="[mobile ? 'text-M-16' : 'text-D-22']">
        {{ formatDate(blogItem.published_at) }}
      </div>
      <div
        :class="[
          'border-white',
          mobile
            ? 'border-M rounded-[5vw] ps-M-10 pe-M-10 text-M-14'
            : 'border-D rounded-[2vw] pt-D-2 ps-D-10 pe-D-10 text-D-18',
        ]"
      >
        {{ blogItem.category }}
      </div>
    </div>

    <p
      :class="[
        'font-bebas-neue',
        mobile ? 'mb-M-10 text-M-32' : 'mb-D-38 text-D-52',
      ]"
    >
      {{ blogItem.title }}
    </p>

    <p
      :class="[
        'formatted-text',
        mobile
          ? 'max-h-[50vw] overflow-hidden mb-M-14 text-M-16 leading-M-24'
          : 'max-h-[10vw] overflow-hidden mb-D-18 text-D-24 leading-D-36',
      ]"
      style="
        mask-image: linear-gradient(to bottom, black 10%, transparent);
        -webkit-mask-image: linear-gradient(to bottom, black 10%, transparent);
      "
    >
      {{ blogItem.text }}
    </p>

    <img
      class="mb-M-10 md:mb-D-20"
      v-if="!hotItem && blogItem.img"
      :src="getBlogImageUrl(blogItem.img)"
    />

    <NuxtLink
      :to="`/blog/${props.blogItem.id}`"
      :class="[hotItem ? '' : 'mt-auto']"
    >
      <button
        :class="[
          'on-hover button-gradient w-full text-center',

          mobile
            ? 'rounded-[1vw] p-M-5 text-M-16'
            : 'mt-auto rounded-[.5vw] p-D-10 text-D-22',
        ]"
        @click="handleClickShowMore"
      >
        show more
      </button>
    </NuxtLink>
  </div>
</template>

<style scoped>
/* bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 */
.button-gradient {
  background: linear-gradient(
    to left,
    #c6c6c6,
    #ffffff 15%,
    #c6c6c6 26%,
    #848181
  );
}

.formatted-text {
  white-space: pre-wrap;
}
</style>
