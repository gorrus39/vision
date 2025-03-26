<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const toast = useToast();

const props = defineProps<{
  class?: string;
}>();

const handleClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  // toast.add({ title: "Soon!)" });
};
</script>

<template>
  <div
    :class="[
      twMerge(
        'on-hover flex items-center justify-center rounded-[.5vw] border-[.1vw] border-black bg-white',
        props.class,
        'w-M-30 h-M-30 md:w-D-80 md:h-D-80',
      ),
    ]"
    @click="handleClick"
  >
    <NuxtImg class="h-M-20 md:h-D-40" src="images/home/arrow-to-up.svg" />
  </div>
</template>
