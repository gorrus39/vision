<script setup lang="ts">
import type { BlogItem } from "~/types/all";

const toast = useToast();

const props = defineProps<{
  blogItem: BlogItem;
  mobile?: true;
}>();

const day = String(props.blogItem.published_at.getDay()).padStart(2, "0");
const month = String(props.blogItem.published_at.getMonth()).padStart(2, "0");

const handleClickShowMore = () => {
  toast.add({ title: "Soon!)" });
};
</script>

<template>
  <div :class="[mobile ? 'p-M-7' : 'p-D-29']">
    <div :class="['flex justify-between', mobile ? 'mb-M-21' : 'mb-D-34']">
      <div :class="[mobile ? 'text-M-16' : 'text-D-22']">
        {{ `${day}.${month}` }}
      </div>
      <div
        :class="[
          'border-white',
          mobile
            ? 'border-M rounded-[5vw] ps-M-10 pe-M-10 text-M-14'
            : 'border-D rounded-[2vw] ps-D-10 pe-D-10 text-D-18',
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
        'on-hover w-full bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-center',

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
