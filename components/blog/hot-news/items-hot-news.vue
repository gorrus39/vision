<script lang="ts" setup>
const { locale } = useI18n()

const { withInfoItems, maxItemsAmount = 3 } = defineProps<{
  withInfoItems?: true
  maxItemsAmount?: number
}>()

const store = useBlogStore()
callOnce(async () => await store.initData())

const hot_items_by_lang = computed(() => {
  return store.data.filter((item) => {
    const isHiPriority = item.priority == "High"
    const correspondingLang = locale.value == item.lang
    return isHiPriority && correspondingLang
  })
})

const hot_items_slice = computed(() => hot_items_by_lang.value.slice(0, maxItemsAmount))
</script>

<template>
  <div class="border-D-t border-D-s hidden flex-wrap md:flex">
    <BlogHotNewsItemText v-if="withInfoItems" />

    <BlogHotNewsItemHot v-for="item in hot_items_slice" :item="item" />

    <BlogHotNewsItemAllArticles v-if="withInfoItems" />
  </div>

  <div :class="[`border-M-s border-M-t border-M-e flex flex-col border-white md:hidden`]">
    <BlogHotNewsItemAllArticles v-if="withInfoItems" />

    <BlogHotNewsItemHot v-for="item in hot_items_slice" :item="item" mobile />
  </div>
</template>
