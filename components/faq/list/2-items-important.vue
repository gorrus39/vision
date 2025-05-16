<script setup lang="ts">
const props = defineProps<{
  withAllLink?: true
}>()

const { locale } = useI18n()

const store = useFaqStore()
await callOnce(() => store.initData())
const { data } = storeToRefs(store)

const hot_items_by_lang = computed(() => {
  return data.value.filter((item) => {
    const isHiPriority = item.priority == "High"
    const correspondingLang = locale.value == item.lang
    return isHiPriority && correspondingLang
  })
})

const itemsAmount = computed(() =>
  props.withAllLink ? hot_items_by_lang.value.slice(0, 2) : hot_items_by_lang.value.slice(0, 3),
)
</script>

<template>
  <div :class="{ 'mb-M-80 me-D-155 ms-D-156 md:mb-D-95': !withAllLink }">
    <div class="flex gap-M-5 md:gap-D-10" v-if="!withAllLink">
      <p class="font-bebas-neue text-M-36 md:text-D-62">
        {{ $t("faq.important") }}
      </p>
      <NuxtImg class="w-M-18 md:w-D-34" src="images/blog/fire.svg" />
    </div>

    <div class="border-D-t border-D-s hidden flex-wrap md:flex">
      <faq-list-item-all-answers v-if="withAllLink" />

      <BlogHotNewsItemHot v-for="item in itemsAmount" :item="item" faq />
    </div>

    <div :class="[`border-M-s border-M-t border-M-e flex flex-col border-white md:hidden`]">
      <BlogHotNewsItemHot v-for="item in itemsAmount" :item="item" mobile faq />

      <faq-list-item-all-answers v-if="withAllLink" />
    </div>

    <!-- 
      <div class="border-D-b border-D-e relative hidden flex-1 border-white p-D-29 md:flex">
    <div class="absolute bottom-0 bg-black right-D--5 w-D-10 h-D-180"></div>
    <div class="relative m-auto flex w-full flex-col">
      <div class="flex w-full justify-between">
        <p class="font-bebas-neue text-D-150 leading-D-180">
          {{ $t("home.vision_blog.all") }}
        </p>
        <NuxtLinkLocale to="/blog">
          <NuxtImg class="on-hover rotate-180 w-D-124" src="images/home/arrow-link.svg" />
        </NuxtLinkLocale>
      </div>
      <p :class="['font-bebas-neue leading-D-180', locale == 'ru' ? 'text-D-120' : 'text-D-150']">
        {{ $t("home.vision_blog.articles") }}
      </p>
    </div>
  </div>

  <div class="border-M-e border-M-b block flex-1 border-white p-M-7 md:hidden">
    <div class="font-bebas-neue flex w-full flex-col mb-M-70 mt-M-70 text-M-80 leading-M-96">
      <div class="flex w-full justify-between">
        <p class="">
          {{ $t("home.vision_blog.all") }}
        </p>
        <NuxtLinkLocale to="/blog">
          <NuxtImg class="on-hover rotate-180 w-M-70" src="images/home/arrow-link.svg" />
        </NuxtLinkLocale>
      </div>
      <p class="text-M-60">
        {{ $t("home.vision_blog.articles") }}
      </p>
    </div>
  </div> -->
  </div>
</template>
