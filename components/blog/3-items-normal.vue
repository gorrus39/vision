<script setup lang="ts">
import { get_items_by_lang } from "~/server/utils/helpers/blog";
import type { BlogItem } from "~/types/blog";

const randAmount = () => {
  const rand = Math.floor(Math.random() * 10);
  return rand % 2 == 0 ? 2 : 1;
};

const reqursiveMakeGroup = (origin: BlogItem[], resultGroup: BlogItem[][] = [], nextIndex: number = 0) => {
  const isOriginEmpty = origin[nextIndex] == undefined;
  if (isOriginEmpty) return resultGroup;

  const hasLastElement = origin[nextIndex + 1] === undefined;
  if (hasLastElement) {
    const row = [origin[nextIndex]];
    resultGroup.push(row);
    return resultGroup;
  }

  const itemsInRowAmount = randAmount();
  const row: BlogItem[] = [];
  const maxNextIndex = nextIndex + itemsInRowAmount;

  for (let i = nextIndex; i < maxNextIndex; i++) {
    if (origin[i] == undefined) continue;

    row.push(origin[i]);
  }

  resultGroup.push(row);
  return reqursiveMakeGroup(origin, resultGroup, maxNextIndex);
};

const { locale } = useI18n();

const { items_view } = storeToRefs(await useInitializedBlogStore());

const items_by_lang = computed(() => {
  return get_items_by_lang(items_view, locale);
});

// const rows = computed(() => items_by_lang.value.map((item) => [item]));
const rows = computed(() => reqursiveMakeGroup(items_by_lang.value));

const availibleImagePositions: ("right" | "left")[] = ["right", "left"];

const imagePosion = () => {
  const index = Math.floor(Math.random() * availibleImagePositions.length);
  return availibleImagePositions[index];
};

const imgMaxWidthStyle = () => {
  return `${Math.floor(Math.random() * 15) + 10}vw`;
};

const cardsWidth = () => {
  const minWidth = 35;
  const value = Math.floor(Math.random() * 25 + minWidth);
  return `${value}vw`;
  // const values = [1, 2, 3];

  // // Перемешиваем массив и выбираем первые два элемента
  // const shuffled = values.sort(() => Math.random() - 0.5);

  // return shuffled[0];
};
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
        />
        <BlogItemsNormalItem2 :item="row[1]" :imgPosition="imagePosion()" :imgMaxWidthStyle="imgMaxWidthStyle()" />
      </div>

      <BlogItemsNormalItem1 v-if="row.length === 1" :item="row[0]" />
    </div>

    <div :class="[`border-M-s border-M-t border-M-e flex flex-col border-white md:hidden`]">
      <BlogItemsNormalItem1Mobile v-for="item in items_by_lang" :item="item" />
    </div>

    <ChanksButtonGoUp class="ms-auto mt-D-30" />
  </div>
</template>
