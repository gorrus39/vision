<script setup lang="ts">
import type { FullBriefJson, FullCatalogItem } from "~/types/catalog"

const showModal = ref(false)

const props = defineProps<{
  item: FullCatalogItem
}>()

const raiting = JSON.parse(props.item.brief) as FullBriefJson
const ratingBefore: null | number = raiting.lastAgrigation.sumValue
const ratingNow: number = getBriefAgrigationValue({ items: raiting.items }).sumValue || 0
</script>

<template>
  <div class="bg-[#1A1A1A] pe-0 ps-0 pt-M-30 pb-M-30 mb-M-40 md:pt-D-70 md:pb-D-70 md:mb-D-80 md:ps-D-182 md:pe-D-182">
    <UModal v-model="showModal" :ui="{ rounded: 'rounded-xl', background: 'bg-black' }">
      <div class="border-M-[2px] md:border-D-[.5px] border-solid border-white p-M-15 md:p-D-40">
        <p class="font-secondary text-center text-M-18 md:text-D-40">{{ $t("catalog.id.rating_changes") }}</p>

        <div>
          <p v-for="num in Array(10)">
            Тут будет какой-то текст, который не меняется из админки. Текст изменится когда появится в фигме.
          </p>
        </div>
      </div>
    </UModal>

    <p
      class="font-secondary border-b-2 border-white text-center font-bold text-M-18 md:border-b-[.5px] md:text-D-40"
    >
      {{ $t("catalog.id.rating") }}
    </p>
    <div class="font-secondary flex justify-center text-M-50 md:text-D-100">
      <div class="on-hover flex items-center justify-center gap-M-10 md:gap-D-10" @click="showModal = true">
        <span>{{ ratingNow }}/100</span>
        <svg
          class="w-auto h-M-35 md:h-D-75"
          v-if="ratingBefore"
          :class="[ratingBefore <= ratingNow ? 'rotate-0' : 'rotate-180']"
          width="8"
          height="20"
          viewBox="0 0 8 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.35355 0.646447C4.15829 0.451184 3.84171 0.451184 3.64645 0.646447L0.464465 3.82843C0.269203 4.02369 0.269203 4.34027 0.464465 4.53553C0.659728 4.7308 0.97631 4.7308 1.17157 4.53553L4 1.70711L6.82843 4.53553C7.02369 4.7308 7.34027 4.7308 7.53553 4.53553C7.7308 4.34027 7.7308 4.02369 7.53553 3.82843L4.35355 0.646447ZM4.5 20L4.5 1L3.5 1L3.5 20L4.5 20Z"
            :fill="ratingBefore <= ratingNow ? '#18B700' : 'red'"
          />
        </svg>
        <NuxtImg class="w-M-18 h-M-18 md:w-D-32 md:h-D-32" src="images/catalog/id/rating-details-icon.svg" />
      </div>
    </div>
  </div>
</template>
