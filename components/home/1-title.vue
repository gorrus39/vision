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
    <div class="border-D-e w-D-154 border-white"></div>
    <div class="border-D-b flex flex-1 border-white">
      <div class="ps-D-28 w-D-732 relative">
        <p class="font-bebas-neue text-D-62 leading-D-75 top-D-144 absolute z-10 md:w-[39vw]">
          {{ $t("home.title.vision_save__") }}
        </p>
      </div>
      <div class="flex w-full flex-col">
        <div class="h-D-593 relative border-white">
          <video class="h-full w-auto" playsinline autoplay muted loop preload="auto">
            <source src="/videos/home/video-desktop.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
          <!-- <p class="absolute text-D-38 top-D-383">*VIDEO*</p> -->
        </div>
        <div class="h-D-359 flex flex-col">
          <div class="border-D-t text-D-24 leading-D-36 flex border-white">
            <span class="pt-D-43 mx-auto">
              {{ $t("home.title.say_goodbuy__") }}
            </span>
          </div>
          <div class="border-D-e h-D-100 relative mt-auto flex border-white">
            <div class="on-hover me-D-100 ms-auto" @click="scrollToAnchor('top-projects')">
              <!-- <NuxtLink to="#top-projects"> -->
              <NuxtImg class="right-D-75 h-D-80 absolute" src="/images/home/arrow-to-bottom.svg" />
              <span class="text-D-28 font-bold">
                {{ $t("home.title.top_projects") }}
              </span>
              <!-- </NuxtLink> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-D-b w-D-154 border-white"></div>
  </div>

  <div class="h-M-499 flex md:hidden">
    <div class="border-M-e w-M-23 border-white"></div>
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
