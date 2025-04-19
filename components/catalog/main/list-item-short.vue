<script setup lang="ts">
const { locale } = useI18n()
import type { FullBriefJson, FullCatalogItem } from "~/types/catalog"

const props = defineProps<{
  item: FullCatalogItem
  index: number
  color?: "red"
}>()

const leftRewards = computed(() => props.item.rewards.filter((i, index) => index == 0 || index == 2))
const rightRewards = computed(() => props.item.rewards.filter((i, index) => index == 1 || index == 3))
const bottomRewards = computed(() => props.item.rewards.filter((i, index) => index > 3))

const getDescriptionShort = (item: FullCatalogItem): string => {
  const description_short_json = JSON.parse(props.item.description_short)
  // @ts-ignore
  let description_short = description_short_json[locale]

  if (description_short == undefined || description_short.length === 0) {
    for (const [lg, string] of Object.entries(description_short_json)) {
      if (string !== 0) description_short = string
    }
  }

  description_short = `${description_short.slice(0, 50)}...`
  return description_short
}

// const getReitingDiff = (reitings: Reiting[]) => {
//   const value_1 = reitings[0]?.value
//   const value_2 = reitings[1]?.value

//   if (value_1 && value_2) {
//     return value_1 >= value_2 ? "up" : "down"
//   } else return "none"
// }

// const getReitingText = (item: FullCatalogItem): string => {
//   const reitings = item.reitings
//   return reitings[0]?.value ? `${reitings[0].value}/100` : ""
// }

// const reitingDiff = getReitingDiff(props.item.reitings)

const reiting = computed(() => {
  const brief = JSON.parse(props.item.brief) as FullBriefJson

  const { sumValue } = getBriefAgrigationValue({ items: brief.items })
  const sumValueBefore = brief.lastAgrigation.sumValue

  return { sumValue, sumValueBefore }
})
</script>

<template>
  <NuxtLinkLocale class="hover:cursor-pointer" :to="`/catalog/${item.id}`">
    <div
      class="flex w-full flex-col justify-between rounded-xl border-[2px] border-solid mb-D-10 p-D-15 md:rounded-md md:border-[.5px] md:w-D-335"
      :style="{ height: '-webkit-fill-available' }"
      :class="[color == 'red' ? 'border-red-500' : 'border-white']"
    >
      <div class="grid grid-cols-3 items-center">
        <!-- Левая колонка -->
        <div class="flex justify-end gap-1">
          <img
            class="w-M-20 md:w-D-44"
            v-for="{ img_path } in leftRewards"
            :key="img_path"
            :src="getRewardImageUrl(img_path)"
          />
        </div>

        <!-- Центр -->
        <div class="flex justify-center">
          <img
            class="overflow-hidden rounded-full border-[.5px] border-solid border-white w-M-35 h-M-35 md:w-D-75 md:h-D-75"
            v-if="item.img_short_path"
            :src="item.img_short_path"
          />
        </div>

        <!-- Правая колонка -->
        <div class="flex justify-start gap-1">
          <img
            class="w-M-20 md:w-D-44"
            v-for="{ img_path } in rightRewards"
            :key="img_path"
            :src="getRewardImageUrl(img_path)"
          />
        </div>
      </div>

      <div class="flex flex-wrap gap-1" v-if="bottomRewards.length > 0">
        <img class="w-D-44" v-for="{ img_path } in bottomRewards" :key="img_path" :src="getRewardImageUrl(img_path)" />
      </div>

      <p class="text-center font-semibold mb-D-10 mt-D-10 text-M-18 md:text-D-24">{{ item.title }}</p>

      <p class="text-center font-semibold mb-D-10 mt-D-10 text-M-12 md:text-D-16">{{ getDescriptionShort(item) }}</p>

      <div class="flex items-center justify-center gap-D-10">
        <span class="font-semibold text-M-14 md:text-D-18">{{ reiting.sumValue }}/100</span>
        <svg
          v-if="reiting.sumValueBefore !== null && reiting.sumValue !== null"
          :class="[reiting.sumValue >= reiting.sumValueBefore ? 'rotate-0' : 'rotate-180']"
          width="8"
          height="20"
          viewBox="0 0 8 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.35355 0.646447C4.15829 0.451184 3.84171 0.451184 3.64645 0.646447L0.464465 3.82843C0.269203 4.02369 0.269203 4.34027 0.464465 4.53553C0.659728 4.7308 0.97631 4.7308 1.17157 4.53553L4 1.70711L6.82843 4.53553C7.02369 4.7308 7.34027 4.7308 7.53553 4.53553C7.7308 4.34027 7.7308 4.02369 7.53553 3.82843L4.35355 0.646447ZM4.5 20L4.5 1L3.5 1L3.5 20L4.5 20Z"
            :fill="reiting.sumValue >= reiting.sumValueBefore ? '#18B700' : 'red'"
          />
        </svg>
      </div>
    </div>
  </NuxtLinkLocale>
</template>
