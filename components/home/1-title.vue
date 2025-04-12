<script setup lang="ts">
// Default to top is instant
const { scrollToAnchor, scrollToTop } = useAnchorScroll({
  toTop: {
    scrollOptions: {
      behavior: "smooth",
      offsetTop: 0,
    },
  },
})

const toast = useToast()
</script>

<template>
  <div class="hidden md:flex">
    <div class="border-D-e border-white w-D-154"></div>
    <div class="border-D-b flex flex-1 border-white">
      <div class="relative ps-D-28 w-D-732">
        <p class="font-bebas-neue absolute z-10 text-D-62 leading-D-75 top-D-144 md:w-[39vw]">
          {{ $t("home.title.vision_save__") }}
        </p>
      </div>
      <div class="flex w-full flex-col">
        <div class="relative border-white h-D-593">
          <video class="h-full w-auto" playsinline autoplay muted loop preload="auto">
            <source src="/videos/home/video-desktop.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
          <!-- <p class="absolute text-D-38 top-D-383">*VIDEO*</p> -->
        </div>
        <div class="flex flex-col h-D-359">
          <div class="border-D-t flex border-white text-D-24 leading-D-36">
            <span class="mx-auto pt-D-43">
              {{ $t("home.title.say_goodbuy__") }}
            </span>
          </div>
          <div class="border-D-e relative mt-auto flex border-white h-D-100">
            <div class="on-hover ms-auto me-D-100" @click="scrollToAnchor('top-projects')">
              <!-- <NuxtLink to="#top-projects"> -->
              <NuxtImg class="absolute top-D--25 right-D-75 h-D-100" src="/images/home/arrow-to-bottom.svg" />
              <span class="font-bold text-D-28">
                {{ $t("home.title.top_projects") }}
              </span>
              <!-- </NuxtLink> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-D-b border-white w-D-154"></div>
  </div>

  <div class="flex h-M-499 md:hidden">
    <div class="border-M-e border-white w-M-23"></div>
    <div class="border-M-b flex flex-1 flex-col border-white">
      <div class="flex flex-1 overflow-hidden">
        <video class="h-auto w-full" playsinline autoplay muted loop preload="auto">
          <source src="/videos/home/video-mobile.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <!-- <span class="m-auto text-M-18">*VIDEO*</span> -->
      </div>
      <p class="font-bebas-neue ms-M-7 text-M-26 leading-M-32 mb-M-37">
        {{ $t("home.title.lorem_ipsum__") }}
      </p>
    </div>
  </div>
</template>
