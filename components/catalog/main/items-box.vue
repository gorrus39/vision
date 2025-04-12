<script setup lang="ts">
import { CatalogMainListItemShort } from "#components"
import type { FullCatalogItem } from "~/types/catalog"

type Amount = 3 | "all"

const viewAmountIndex = ref<Amount>(3)

const props = defineProps<{
  items: FullCatalogItem[]
  title: string
  isLarge?: true
  color?: "red"
}>()

const viewItems = computed(() => {
  const count = viewAmountIndex.value === "all" ? props.items.length : 3
  return props.items.slice(0, count)
})

const toggle = () => {
  viewAmountIndex.value = viewAmountIndex.value == "all" ? 3 : "all"
}
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
      class="flex flex-col rounded-xl border-[2px] border-solid p-M-20 md:rounded-md md:border-[.5px] md:p-D-39"
      :class="color == 'red' ? 'border-red-500' : 'border-white'"
    >
      <TransitionGroup
        class="flex w-full flex-col flex-wrap justify-center gap-M-30 md:flex-row md:gap-D-70"
        name="list"
        tag="div"
      >
        <!-- <CatalogMainListItemLarge
          v-for="(item, index) in viewItems"
          :key="item.id || index"
          :item="item"
          :index="index"
        /> -->

        <CatalogMainListItemShort
          v-for="(item, index) in viewItems"
          :key="item.id || index"
          :item="item"
          :index="index"
          :color="color == 'red' ? 'red' : undefined"
        />
      </TransitionGroup>

      <UIcon
        class="on-hover m-auto transition-transform duration-300 w-M-30 h-M-30 md:me-[0] md:w-D-30 md:h-D-30"
        v-if="items.length > 3"
        name="i-ep:arrow-down-bold"
        :class="[viewAmountIndex !== 'all' ? 'rotate-0' : 'rotate-180']"
        @click="toggle"
      />
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
