<script setup lang="ts">
import type { BlogItem } from "~/types/all";

const toast = useToast();

const props = defineProps<{
  blogItem: BlogItem;
  mobile?: true;
}>();

const handleClickShowMore = () => {
  toast.add({ title: "Soon!)" });
};
</script>

<template>
  <div
    :class="['border-white', mobile ? 'border-M-e p-M-7' : 'border-D-e p-D-29']"
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
        mobile
          ? 'mb-M-14 text-M-16 leading-M-24'
          : 'mb-D-18 text-D-24 leading-D-36',
      ]"
    >
      {{ blogItem.text }}
    </p>

    <button
      :class="[
        'on-hover button-gradient w-full text-center',

        mobile
          ? 'rounded-[1vw] p-M-5 text-M-16'
          : 'rounded-[.5vw] p-D-10 text-D-22',
      ]"
      @click="handleClickShowMore"
    >
      show more
    </button>
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
</style>
