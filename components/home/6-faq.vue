<script setup lang="ts">
const { locale } = useI18n()
const store = useFaqStore()
await callOnce("faq-store", () => store.initData())

const maxSlidesAmount = 6

const items = computed(() =>
  store.data
    .filter((i) => i.lang === locale.value)
    .filter((i) => i.priority === "High")
    .slice(0, maxSlidesAmount - 1),
)
</script>

<template>
  <div class="border-D-b relative hidden h-[60vw] min-h-[60vw] overflow-hidden border-white md:block">
    <HomeFaqSwiper class="pt-D-200 ms-D-600 w-D-700" :items />

    <NuxtImg class="-bottom-D-160 -right-D-20 w-D-1225 absolute" src="images/home/figure-4.png" />
    <ChanksButtonGoUp class="bottom-D-50 right-D-100 absolute" />

    <div class="border-D-s left-D-154 absolute top-0 flex h-full border-white">
      <!-- <div class="border-D-e border-white w-D-154"></div> -->
      <p
        class="font-bebas-neue ms-D-40 mt-D-120 flex w-min flex-col"
        style="word-break: break-all"
        :class="[locale == 'cn' ? 'text-D-200 leading-D-230' : 'text-D-300 leading-D-300']"
      >
        {{ $t("home.faq.faq") }}
      </p>
    </div>
  </div>

  <div class="border-M-b flex max-w-screen flex-col overflow-x-hidden border-white md:hidden">
    <div class="h-M-20 flex">
      <!-- <div class="border-M-e flex-1 border-white"></div> -->
      <div class="w-M-24"></div>
    </div>

    <div class="font-bebas-neue text-M-50 leading-M-60 text-center">
      {{ $t("home.faq.faq") }}
    </div>

    <HomeFaqSwiper class="mb-M-20 m-auto w-[70vw]" :items mobile />

    <div class="f-full flex">
      <ChanksButtonGoUp class="me-M-30 mb-M-30 ms-auto" />
    </div>
  </div>
</template>
