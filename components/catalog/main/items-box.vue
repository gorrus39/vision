<script setup lang="ts">
import { CatalogMainListItemShort } from "#components"
import type { FullCatalogItem } from "~/types/catalog"

const viewWidth: Ref<number> = useViewWidth()
const viewAll = ref(false)

defineProps<{
  items: FullCatalogItem[]
  title: string
  isLarge?: true
  color?: "red"
}>()
</script>

<template>
  <div class="me-M-23 ms-M-23 md:me-D-182 md:ms-D-182">
    <b
      ><p
        class="font-secondary text-center mb-M-10 text-M-18 mt-M-20 md:mb-D-10 md:text-D-32 md:mt-D-40"
        :class="color == 'red' ? 'text-red-500' : 'text-white'"
      >
        {{ title }}
      </p></b
    >
    <div
      class="flex flex-col rounded-xl border-2 border-solid p-M-20 md:rounded-md md:border-[.5px] md:p-D-39"
      :class="color == 'red' ? 'border-red-500' : 'border-white'"
    >
      <TransitionGroup
        class="flex w-full flex-col flex-wrap justify-center gap-M-30 md:flex-row md:gap-D-70"
        v-if="viewAll || (viewWidth && viewWidth < 786)"
        name="list"
        tag="div"
      >
        <CatalogMainListItemLarge
          v-if="isLarge"
          v-for="(item, index) in viewAll ? items : items.slice(0, 3)"
          :key="item.id || index"
          :item="item"
          :index="index"
        />

        <CatalogMainListItemShort
          v-else
          v-for="(item, index) in viewAll ? items : items.slice(0, 3)"
          :key="index"
          :item="item"
          :index="index"
          :color="color == 'red' ? 'red' : undefined"
        />
      </TransitionGroup>

      <UCarousel v-else v-slot="{ item, index }" :items="items" :ui="{ container: 'gap-D-70 ', wrapper: 'ms-D-140' }">
        <CatalogMainListItemLarge v-if="isLarge" :key="item.id || index" :item="item" :index="index" />

        <CatalogMainListItemShort
          v-else
          :key="index"
          :item="item"
          :index="index"
          :color="color == 'red' ? 'red' : undefined"
        />
      </UCarousel>

      <UIcon
        class="on-hover m-auto transition-transform duration-300 w-M-30 h-M-30 md:me-[0] md:w-D-30 md:h-D-30"
        v-if="items.length > 3"
        name="i-ep:arrow-down-bold"
        :class="[viewAll ? 'rotate-0' : 'rotate-180']"
        @click="viewAll = !viewAll"
      />
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
