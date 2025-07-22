<script setup lang="ts">
import type { FullCatalogItem } from "~/types/catalog"

const showModal = ref(false)

const props = defineProps<{
  item: FullCatalogItem
}>()

const brief = props.item.brief
const ratingBefore: null | number = brief.lastAgrigation.sumValue
const ratingNow: number = getBriefAgrigationValue({ items: brief.items }).sumValue || 0
</script>

<template>
  <div class="pt-M-30 pb-M-30 mb-M-40 md:pt-D-70 md:pb-D-70 md:mb-D-80 md:ps-D-182 md:pe-D-182 bg-[#1A1A1A] ps-0 pe-0">
    <UModal v-model:open="showModal">
      <template #content>
        <div class="border-M-[2px] md:border-D-[.5px] p-M-15 md:p-D-40 border-solid border-white text-black">
          <p class="font-secondary text-M-18 md:text-D-40 text-center">{{ $t("catalog.id.rating_changes") }}</p>

          <div>
            <p v-for="num in Array(10)">
              Тут будет какой-то текст, который не меняется из админки. Текст изменится когда появится в фигме.
            </p>
          </div>
        </div>
      </template>
    </UModal>

    <p class="font-secondary text-M-18 md:text-D-40 border-b-2 border-white text-center font-bold md:border-b-[.5px]">
      {{ $t("catalog.id.rating") }}
    </p>
    <div class="font-secondary text-M-50 md:text-D-100 flex justify-center">
      <div class="on-hover gap-M-10 md:gap-D-10 flex items-center justify-center" @click="showModal = true">
        <span>{{ ratingNow }}/100</span>
        <svg
          class="h-M-35 md:h-D-75 w-auto"
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
