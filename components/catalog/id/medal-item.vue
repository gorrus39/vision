<script setup lang="ts">
import type { Reward } from "~/types/catalog"
const showModal = ref(false)

defineProps<{
  medal: Reward
}>()
</script>

<template>
  <UModal v-model="showModal" :ui="{ rounded: 'rounded-xl', width: 'max-w-[90vw] md:max-w-[60vw]' }">
    <div class="flex flex-col items-center rounded-xl bg-black p-M-20 gap-D-40 md:flex-row md:p-D-48">
      <img class="w-M-82 md:w-D-230" :src="getRewardImageUrl(medal.img_path)" />

      <div class="border-D-s hidden md:block">
        <p class="font-secondary border-D-b p-D-26 text-D-40">{{ medal.name }}</p>
        <p class="text-D-26 p-D-26">{{ medal.description }}</p>
      </div>

      <div class="block md:hidden">
        <p class="font-secondary border-M-b p-M-14 text-M-18">{{ medal.name }}</p>
        <p class="text-M-14 p-M-14">{{ medal.description }}</p>
      </div>
    </div>
  </UModal>
  <div
    class="img w-M-50 h-M-50 md:w-D-270 md:h-D-270"
    @click="showModal = true"
    :style="{
      backgroundImage: `url(${getRewardImageUrl(medal.img_path)})`,
    }"
  ></div>
</template>

<style scoped>
.img {
  background-position: top;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;
  background-size: contain;
}

.img::after {
  content: "";
  position: absolute;
  top: -25%;
  left: -25%;
  width: 150%;
  height: 150%;
  background: inherit;
  filter: blur(0px);
  opacity: 0;
  transition: 0.2s ease-in-out;
  z-index: -1;
}

.img:hover::after {
  filter: blur(30px);
  opacity: 1;
}
</style>
