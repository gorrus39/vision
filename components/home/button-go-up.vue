<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const toast = useToast();

const props = defineProps<{
  class?: string;
  mobile?: true;
}>();

const handleClick = () => {
  toast.add({ title: "Soon!)" });
};
</script>

<template>
  <div
    :class="[
      twMerge(
        'on-hover flex items-center justify-center rounded-[.5vw] border-[.1vw] border-black bg-white',
        props.class,
        mobile ? 'w-M-30 h-M-30' : 'w-D-80 h-D-80',
      ),
    ]"
    @click="handleClick"
  >
    <NuxtImg
      :class="[mobile ? 'h-M-20' : 'h-D-40']"
      src="images/home/arrow-to-up.svg"
    />
  </div>
</template>
