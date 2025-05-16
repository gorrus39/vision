<script lang="ts" setup>
const { locale } = useI18n()
const toast = useToast()
</script>

<template>
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
  </div>
</template>
