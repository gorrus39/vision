<script setup lang="ts">
const { locale } = useI18n();
</script>

<template>
  <div class="border-D-b relative hidden h-[60vw] min-h-[60vw] overflow-hidden border-white md:block">
    <HomeFaqSwiper class="pt-D-200 ms-D-600 w-D-700" />

    <NuxtImg class="absolute bottom-D--160 right-D--20 w-D-1225" src="images/home/figure-4.png" />
    <HomeButtonGoUp class="absolute bottom-D-50 right-D-100" />

    <div class="absolute top-0 flex h-full">
      <div class="border-D-e border-white w-D-154"></div>
      <p
        class="font-bebas-neue flex w-min flex-col ms-D-40 mt-D-120"
        style="word-break: break-all"
        :class="[locale == 'cn' ? 'text-D-200 leading-D-230' : 'text-D-300 leading-D-300']"
      >
        {{ $t("home.faq.faq") }}
      </p>
    </div>
  </div>

  <div class="border-M-b flex max-w-[100vw] flex-col overflow-x-hidden border-white md:hidden">
    <div class="flex h-M-20">
      <div class="border-M-e flex-1 border-white"></div>
      <div class="w-M-24"></div>
    </div>

    <div class="font-bebas-neue text-center text-M-50 leading-M-60">
      {{ $t("home.faq.faq") }}
    </div>

    <HomeFaqSwiper class="m-auto w-[70vw] mb-M-20" mobile />

    <div class="f-full flex">
      <HomeButtonGoUp class="ms-auto me-M-30 mb-M-30" mobile />
    </div>
  </div>
</template>
