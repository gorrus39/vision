<script setup lang="ts">
import type { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCards, Autoplay } from "swiper/modules";
import type { FAQItem } from "~/types/all";
import "swiper/css";
import "swiper/css/effect-cards";

const toast = useToast();

const onSwiper = (swiper: SwiperType) => {
  // console.log(swiper);
};
const onSlideChange = () => {
  // console.log("slide change");
};

const props = defineProps<{
  mobile?: true;
  class?: string;
}>();

let id = 1;
const slides: Ref<FAQItem[]> = ref([
  {
    id: id++,
    title: "HOW WE RATE",
    text: "general F.A.Q. how we rate projects general F.A.Q. how we rate projects general F.A.Q. how we rate projects general F.A.Q. how we rate projects general F.A.Q. how we rate projects general F.A.Q. how we rate projects general F.A.Q. how we rate projects general F.A.Q. how we rate projects general F.A.Q. how we rate projects general F.A.Q. how we rate projects general F.A.Q. how we rate projects general F.A.Q. how we rate projects ",
  },
  {
    id: id++,
    title: "HOW TO LIST",
    text: "general F.A.Q. how we rate projects",
  },
  {
    id: id++,
    title: "HOW TO apperal",
    text: "general F.A.Q. how we rate projects",
  },
  {
    id: id++,
    title: "WHAT DOES TEAR 1 MEAN",
    text: "general F.A.Q. how we rate projects",
  },
  {
    id: id++,
    title: "chat chat vs forum forum",
    text: "general F.A.Q. how we rate projects",
  },
]);

const handleClick = () => {
  toast.add({ title: "Soon!)" });
};
</script>
<!-- :slides-per-view="1"
:space-between="50" -->

<template>
  <div :class="[props.class]">
    <!-- <ClientOnly> -->
    <Swiper
      :modules="[EffectCards, Autoplay]"
      effect="cards"
      slidesPerView="auto"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      @click="handleClick"
      :autoplay="{ delay: 3000 }"
    >
      <SwiperSlide
        v-for="(item, index) in slides"
        :class="[
          'border-D cursor-grab border-black',
          mobile ? 'rounded-[6vw] p-M-15' : 'rounded-[2vw] p-D-30',
          index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-600',
        ]"
        :key="item.id"
      >
        <div class="flex flex-col">
          <NuxtImg
            :class="['on-hover self-end', props.mobile ? 'w-M-40' : 'w-D-80']"
            @click="handleClick"
            src="images/home/arrow-link.svg"
          />
          <p
            :class="[
              'font-bebas-neue',
              mobile ? 'text-M-30 leading-M-40' : 'text-D-70 leading-D-80',
            ]"
          >
            {{ item.title }}
          </p>
          <p
            :class="[
              '',
              mobile ? 'text-M-14 leading-M-20' : 'text-D-28 leading-D-36',
            ]"
          >
            {{ item.text }}
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
    <!-- </ClientOnly> -->
  </div>
</template>

<style></style>
