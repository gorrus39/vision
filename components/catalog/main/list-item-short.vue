<script setup lang="ts">
const { locale } = useI18n()
import type { FullCatalogItem } from "~/types/catalog"

const props = defineProps<{
  item: FullCatalogItem
  index: number
  color?: "red"
}>()

const rewardStore = useCatalogRewardsStore()
callOnce(async () => rewardStore.initData())
const rewardStoreData = rewardStore.data

const rewardIds = props.item.catalog_reward_ids

const leftRewardsCondition = (_item: any, index: number) => index == 0 || index == 2
const rightRewardsCondition = (_item: any, index: number) => index == 1 || index == 3
const bottomRewardsCondition = (_item: any, index: number) => index > 3

const leftRewards = computed(() =>
  rewardIds
    .filter(leftRewardsCondition)
    .map((rewardId) => rewardStoreData.find((r) => r.id === rewardId))
    .filter(Boolean),
)

const rightRewards = computed(() =>
  rewardIds
    .filter(rightRewardsCondition)
    .map((rewardId) => rewardStoreData.find((r) => r.id === rewardId))
    .filter(Boolean),
)

const bottomRewards = computed(() =>
  rewardIds
    .filter(bottomRewardsCondition)
    .map((rewardId) => rewardStoreData.find((r) => r.id === rewardId))
    .filter(Boolean),
)

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
  const brief = props.item.brief
  const { sumValue } = getBriefAgrigationValue({ items: brief.items })
  const sumValueBefore = brief.lastAgrigation.sumValue

  return { sumValue, sumValueBefore }
})

const imageShort = props.item.images.find((i) => !i.is_title)
</script>

<template>
  <NuxtLinkLocale class="hover:cursor-pointer" :to="`/catalog/${item.id}`">
    <div
      class="mb-D-10 p-D-15 md:w-D-335 flex w-full flex-col justify-between rounded-xl border-2 border-solid md:rounded-md md:border-[.5px]"
      :style="{ height: '-webkit-fill-available' }"
      :class="[color == 'red' ? 'border-red-500' : 'border-white']"
    >
      <div class="grid grid-cols-3 items-center">
        <!-- Левая колонка -->
        <div class="flex justify-end gap-1">
          <img class="w-M-20 md:w-D-44" v-for="reward in leftRewards" :src="getImagePath(reward?.images[0])" />
        </div>

        <!-- Центр -->
        <div class="flex justify-center">
          <img
            class="w-M-35 h-M-35 md:w-D-75 md:h-D-75 overflow-hidden rounded-full border-[.5px] border-solid border-white"
            v-if="imageShort"
            :src="getImagePath(imageShort)"
          />
        </div>

        <!-- Правая колонка -->
        <div class="flex justify-start gap-1">
          <img class="w-M-20 md:w-D-44" v-for="reward in rightRewards" :src="getImagePath(reward?.images[0])" />
        </div>
      </div>

      <div class="flex flex-wrap gap-1" v-if="bottomRewards.length > 0">
        <img
          class="w-D-44"
          v-for="reward in bottomRewards"
          :key="reward?.name"
          :src="getImagePath(reward?.images[0])"
        />
      </div>

      <p class="mb-D-10 mt-D-10 text-M-18 md:text-D-24 text-center font-semibold">{{ item.title }}</p>

      <p class="mb-D-10 mt-D-10 text-M-12 md:text-D-16 text-center font-semibold">{{ getDescriptionShort(item) }}</p>

      <div class="gap-D-10 flex items-center justify-center">
        <span class="text-M-14 md:text-D-18 font-semibold">{{ reiting.sumValue }}/100</span>
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
