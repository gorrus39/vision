<script setup lang="ts">
const { locale } = useI18n()
import type { FullCatalogItem, Tag } from "~/types/catalog"

const cardType = ["chat", "markets", "forums", "top sellers", "essentials", "others"]

const toast = useToast()

const props = defineProps<{
  project: FullCatalogItem
  index: number
  screen: "mobile" | "desktop"
}>()

const isEven = props.index % 2 == 0

const tagsString = props.project.tags
// debugger
const cardTags = tagsString
let type = cardType[0] // default

for (const cardTag of cardTags) {
  if (cardType.includes(cardTag)) {
    type = cardTag
    break
  }
}

const reiting = computed(() => {
  const brief = props.project.brief

  const { sumValue } = getBriefAgrigationValue({ items: brief.items })
  const sumValueBefore = brief.lastAgrigation.sumValue

  return { sumValue, sumValueBefore }
})

const description_short = () => {
  const json = JSON.parse(props.project.description_short) as { ru: string; en: string; cn: string }

  if (json[locale.value].length > 0) return json[locale.value]

  for (const value of Object.values(json)) {
    if (value.length > 0) return value
  }
}
</script>
<template>
  <NuxtLinkLocale :to="`/catalog/${project.id}`">
    <div
      :class="[
        'pointer flex flex-col rounded-[1vw]',
        { 'bg-white': isEven },
        { 'text-black': isEven },
        { 'border-D p-D-20 gap-D-22 w-D-405': screen == 'desktop' },
        { 'border-M gap-M-19 p-M-20 w-full': screen == 'mobile' },
      ]"
    >
      <div class="flex items-center justify-between">
        <div
          :class="[
            'text-center',
            isEven ? 'border-black' : 'border-white',
            { 'border-D text-D-12 w-D-50 rounded-[.3vw]': screen == 'desktop' },
            { 'border-M text-M-12 w-M-50 rounded-[2vw]': screen == 'mobile' },
          ]"
        >
          {{ type }}
        </div>
        <NuxtImg
          :class="['on-hover', { 'w-D-30': screen == 'desktop' }, { 'w-M-30': screen == 'mobile' }]"
          @click="toast.add({ title: 'Soon!)' })"
          src="images/home/arrow-link.svg"
        />
      </div>

      <div :class="['flex items-start', { 'gap-D-19': screen == 'desktop' }, { 'gap-M-7': screen == 'mobile' }]">
        <!-- <NuxtImg
        :class="[{ 'w-D-48': screen == 'desktop' }, { 'w-M-34': screen == 'mobile' }]"
        src="images/home/avatar.svg"
      /> -->
        <img
          class="rounded-full object-cover"
          v-if="project.images[0]"
          :class="[{ 'w-D-48': screen == 'desktop' }, { 'w-M-34': screen == 'mobile' }]"
          :src="getImagePath(project.images[0])"
        />
        <div class="md:gap-D-10 flex flex-col">
          <p
            :class="[
              'font-bold',
              { 'mb-D-2 text-D-24': screen == 'desktop' },
              { 'mb-M-2 text-M-17': screen == 'mobile' },
            ]"
          >
            {{ project.title.toUpperCase() }}
          </p>

          <!-- <div :class="['flex', { 'gap-D-4 mb-D-16': screen == 'desktop' }, { 'gap-M-4 mb-M-16': screen == 'mobile' }]">
          <p
            :class="[
              'font-bold text-[#FFE72E]',
              { 'text-D-14': screen == 'desktop' },
              { 'text-M-14': screen == 'mobile' },
              ]"
              >
              {{ project.starsAmount }}
          </p>
          <NuxtImg
            :class="[{ 'w-D-20': screen == 'desktop' }, { 'w-M-20': screen == 'mobile' }]"
            src="images/home/star.svg"
            />
          </div> -->

          <div class="gap-D-10 flex items-center">
            <span class="text-M-14 md:text-D-18 font-semibold">{{ reiting.sumValue }}/100</span>
            <svg
              v-if="reiting.sumValueBefore !== null && reiting.sumValue !== null"
              :class="[reiting.sumValue >= reiting.sumValueBefore ? 'rotate-0' : 'rotate-180']"
              width="8"
              height="14"
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

          <div class="x-mask overflow-hidden">
            <p
              class="max-h-[10vw] md:max-h-[5vw]"
              :class="[
                { 'text-D-18 leading-D-27': screen == 'desktop' },
                { 'text-M-14 leading-M-21': screen == 'mobile' },
              ]"
            >
              {{ description_short() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLinkLocale>
</template>

<style scoped>
.x-mask {
  mask-image: linear-gradient(black, transparent);
}
</style>
