<script setup lang="ts">
const toast = useToast();

const texts = [
  "We unite the entire network into one thriving community, guiding you toward the path that best aligns with your goals. ".toUpperCase(),
  "We are putting our community in a way, which will make it impossible to wipe or delete by anyone.".toUpperCase(),
  "This is the next-generation catalog you’ve never seen before.".toUpperCase(),
  "Featuring real-time ratings, deep insights, exclusive announcements, daily support, and constant updates. ".toUpperCase(),
];

const onClickButton = () => {
  toast.add({ title: "Soon!)" });
};
const goToLearnMore = () => {
  toast.add({ title: "Soon!)" });
};
</script>

<template>
  <div class="text-D-38 hidden md:block">
    <div class="flex">
      <div class="w-D-1109 flex flex-col">
        <div class="h-D-100"></div>
        <div class="h-D-320 border-D-b border-D-e relative border-white">
          <p class="top-D-30 left-D-183 leading-D-57 w-D-860 relative">
            {{ texts[0] }}
          </p>
        </div>
      </div>

      <div class="border-D-e relative flex flex-1 border-white">
        <div
          class="on-hover left-D-150 absolute top-1/2"
          @click="goToLearnMore"
        >
          <NuxtImg
            class="bottom-D-1 w-D-600 absolute"
            src="images/home/arrow-to-right.svg"
          />
          <span class="text-D-30 font-semibold">LEARN MORE ABOUT VISION</span>
        </div>
        <div class="w-D-500 border-D-b border-white"></div>
        <div class="flex-1"></div>
      </div>

      <div class="w-D-154"></div>
    </div>

    <div class="h-D-938 flex">
      <div class="w-D-588 flex flex-col">
        <div class="h-D-80"></div>
        <div class="border-D-e flex flex-1 border-white">
          <div class="relative flex-1">
            <NuxtImg
              class="w-D-400 left-D-200 absolute"
              src="/images/home/figure-1.png"
            />
            <p class="w-D-580 top-D-600 left-D-200 absolute">
              {{ texts[2] }}
            </p>
          </div>
          <div class="w-D-230 border-D-b border-white"></div>
        </div>
      </div>
      <div class="w-D-521 relative flex flex-col">
        <NuxtImg
          class="w-D-528 top-D-400 left-D-100 absolute"
          src="images/home/vision.png"
        />
        <div class="border-D-e flex-1 border-white"></div>
        <div class="h-D-100 border-D-b w-full border-white"></div>
      </div>
      <div class="border-D-e flex flex-1 border-white">
        <div class="border-D-b relative flex-1 border-white">
          <p class="top-D--60 left-D-20 absolute">
            {{ texts[1] }}
          </p>
          <NuxtImg
            class="bottom-D-100 w-D-250 left-D-300 absolute"
            src="images/home/figure-2.png"
          />
        </div>
        <div class="w-D-154"></div>
      </div>
      <div class="w-D-154"></div>
    </div>

    <div class="h-D-242 flex">
      <div class="w-D-588 border-D-e relative flex h-full border-white">
        <button
          class="ps-D-30 pe-D-30 on-hover text-D-30 top-D-40 right-D-30 border-D absolute font-semibold ring-white"
          @click="onClickButton"
        >
          FEATURES VLOGS
        </button>
      </div>
      <div class="border-D-e flex-1 border-white">
        <p class="m-D-30 w-4/5">{{ texts[3] }}</p>
      </div>
      <div class="w-D-154"></div>
    </div>
    <div class="h-D-100 flex">
      <div class="border-D-e flex-1 border-white"></div>
      <div class="w-D-154"></div>
    </div>
  </div>

  <div class="mt-M-54 text-M-16 leading-M-24 block md:hidden">
    <div class="ms-M-30 me-M-30 mb-M-30">
      <NuxtImg class="mb-M-22 w-full" src="images/home/vision.png" />
      <UDivider class="mb-M-37" />
      <p>{{ texts[0] }}</p>
    </div>
    <UDivider class="mb-M-35" />
    <p class="ms-M-30 me-M-30 mb-M-35 text-right">{{ texts[1] }}</p>
    <UDivider class="mb-M-35" />
    <p class="ms-M-30 me-M-30 mb-M-35">{{ texts[2] }}</p>
    <UDivider class="mb-M-35" />
    <p class="ms-M-30 me-M-30 mb-M-35 text-right">{{ texts[3] }}</p>
    <div
      class="on-hover ms-M-30 me-M-30 mb-M-35 border-M flex justify-center border-white"
      @click="onClickButton"
    >
      <span class="text-M-14 font-semibold"> FEATURES VLOGS </span>
    </div>
    <div class="on-hover flex items-center" @click="goToLearnMore">
      <div class="w-M-30"></div>

      <div class="h-M-80 flex flex-col items-center">
        <span class="text-M-15 font-semibold">LEARN MORE ABOUT VISION</span>
        <NuxtImg class="w-M-259" src="images/home/arrow-to-right.svg" />
      </div>
      <div class="w-M-30 h-M-80">
        <div class="w-M-7 border-M-e h-full border-white"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
