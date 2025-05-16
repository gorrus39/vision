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

const { items_view } = storeToRefs(await useInitializedBlogStore())
const faqStore = useFaqStore()
await callOnce(() => faqStore.initData())

const items_by_lang = computed(() => {
  const itemsType = props.isFaqItems ? ref(faqStore.data) : items_view

  return get_items_by_lang(itemsType, locale)
})

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

// 1
// imgPosition: left | right
// imgWidth 40vw - 60vw
// itemWidth: flex-1

// 2
// imgPosition: left | right
// imgWidth 20vw - 30vw
// itemWidth: flex-1 | vw

// 3
// imgPosition: left | right | bottom
// imgWidth 20vw - 30vw
// itemWidth: flex-1 | vw
// flex col with bottom img
// flex reverse?
</script>

<template>
  <div class="border-D-t border-white mb-M-83 me-D-155 ms-D-156 md:mb-D-183">
    <div class="hidden md:block" v-for="row in rows">
      <div class="flex" v-if="row.length === 2">
        <BlogItemsNormalItem2
          :item="row[0]"
          :imgPosition="imagePosion()"
          :imgMaxWidthStyle="imgMaxWidthStyle()"
          :width="cardsWidth()"
          isFaqItems
        />
        <BlogItemsNormalItem2
          :item="row[1]"
          :imgPosition="imagePosion()"
          isFaqItems
          :imgMaxWidthStyle="imgMaxWidthStyle()"
        />
      </div>

      <BlogItemsNormalItem1 v-if="row.length === 1" :item="row[0]" isFaqItems />
    </div>

    <div :class="[`border-M-s border-M-t border-M-e flex flex-col border-white md:hidden`]">
      <BlogItemsNormalItem1Mobile v-for="item in items_by_lang" :item="item" isFaqItems />
    </div>

    <div class="text-M-16 mt-M-30 md:mt-D-30 md:text-D-40" v-if="isFaqItems">
      {{ $t("faq.text") }}
    </div>

    <ChanksButtonGoUp class="ms-auto mt-D-30" />
  </div>
</template>
