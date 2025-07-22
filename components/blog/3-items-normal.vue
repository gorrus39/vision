<script setup lang="ts">
import { get_items_by_lang } from "~/utils/blog"
import type { BlogItem } from "~/types/blog"
import type { FullFaqItem } from "~/types/faq"

const props = defineProps<{
  isFaqItems?: true
}>()
const randBool = (): boolean => {
  return Math.random() > 0.5
}

const randAmount = () => {
  const rand = Math.floor(Math.random() * 10)
  return rand % 2 == 0 ? 2 : 1
}

const reqursiveMakeGroup = <T extends BlogItem | FullFaqItem>(
  origin: T[],
  resultGroup: T[][] = [],
  nextIndex: number = 0,
): T[][] => {
  const isOriginEmpty = origin[nextIndex] == undefined
  if (isOriginEmpty) return resultGroup

  const hasLastElement = origin[nextIndex + 1] === undefined
  if (hasLastElement) {
    const row = [origin[nextIndex]]
    resultGroup.push(row)
    return resultGroup
  }

  const itemsInRowAmount = randAmount()
  const row: T[] = []
  const maxNextIndex = nextIndex + itemsInRowAmount

  for (let i = nextIndex; i < maxNextIndex; i++) {
    if (origin[i] == undefined) continue

    row.push(origin[i])
  }

  resultGroup.push(row)
  return reqursiveMakeGroup(origin, resultGroup, maxNextIndex)
}

const { locale } = useI18n()

const blogStore = useBlogStore()
await callOnce(() => blogStore.initData())

const items_view = blogStore.data

const faqStore = useFaqStore()
await callOnce(() => faqStore.initData())

const items_by_lang = computed(() => {
  const itemsType = props.isFaqItems ? faqStore.data : items_view

  return get_items_by_lang(ref(itemsType), locale)
})
// alert(items_by_lang.value.length)
// const rows = computed(() => items_by_lang.value.map((item) => [item]));
const rows = computed(() => reqursiveMakeGroup(items_by_lang.value))

const availibleImagePositions: ("right" | "left")[] = ["right", "left"]

const imagePosion = () => {
  const index = Math.floor(Math.random() * availibleImagePositions.length)
  return availibleImagePositions[index]
}

const imgMaxWidthStyle = () => {
  return `${Math.floor(Math.random() * 15) + 10}vw`
}

const cardsWidth = () => {
  const minWidth = 35
  const value = Math.floor(Math.random() * 25 + minWidth)
  return `${value}vw`
}
</script>

<template>
  <div class="border-D-t mb-M-83 me-D-155 ms-D-156 md:mb-D-183 border-white">
    <div class="hidden md:block" v-for="row in rows">
      <div class="flex" v-if="row.length === 2">
        <BlogItemsNormalItem2
          :item="row[0]"
          :imgPosition="imagePosion()"
          :imgMaxWidthStyle="imgMaxWidthStyle()"
          :width="cardsWidth()"
          :isFaqItems
        />
        <BlogItemsNormalItem2
          :item="row[1]"
          :imgPosition="imagePosion()"
          :isFaqItems
          :imgMaxWidthStyle="imgMaxWidthStyle()"
        />
      </div>

      <BlogItemsNormalItem1 v-if="row.length === 1" :item="row[0]" :isFaqItems />
    </div>

    <div :class="[`border-M-s border-M-t border-M-e flex flex-col border-white md:hidden`]">
      <BlogItemsNormalItem1Mobile v-for="item in items_by_lang" :item="item" :isFaqItems />
    </div>

    <div class="text-M-16 mt-M-30 md:mt-D-30 md:text-D-40" v-if="isFaqItems">
      {{ $t("faq.text") }}
    </div>

    <ChanksButtonGoUp class="mt-D-30 ms-auto" />
  </div>
</template>
