<script setup lang="ts">
const toast = useToast()

const onClickButton = () => {
  toast.add({ title: "Soon!)" })
}
const goToLearnMore = () => {
  toast.add({ title: "Soon!)" })
}
</script>

<template>
  <div class="text-D-38 hidden md:block">
    <div class="flex">
      <div class="w-D-1109 flex flex-col">
        <div class="h-D-100"></div>
        <div class="border-D-b border-D-e h-D-320 relative border-white">
          <p class="top-D-30 leading-D-57 left-D-183 w-D-860 relative">
            {{ $t("home.vision.we_unite_the__") }}
          </p>
        </div>
      </div>

      <div class="border-D-e relative flex flex-1 border-white">
        <NuxtLinkLocale class="on-hover left-D-150 absolute top-1/2" to="/about-fraudvision">
          <!-- <div class="on-hover left-D-150 absolute top-1/2" @click="goToLearnMore"> -->
          <NuxtImg class="bottom-D-1 w-D-600 absolute" src="images/home/arrow-to-right.svg" />
          <span class="text-D-30 font-semibold">
            {{ $t("home.vision.learn_more__") }}
          </span>
          <!-- </div> -->
        </NuxtLinkLocale>

        <div class="border-D-b w-D-500 border-white"></div>
        <div class="flex-1"></div>
      </div>

      <div class="w-D-154"></div>
    </div>

    <div class="h-D-938 flex">
      <div class="w-D-588 flex flex-col">
        <div class="h-D-80"></div>
        <div class="border-D-e flex flex-1 border-white">
          <div class="relative flex-1">
            <NuxtImg class="left-D-200 w-D-400 absolute" src="images/home/figure-1.png" format="png" />
            <p class="left-D-200 w-D-580 top-D-600 absolute">
              {{ $t("home.vision.this_is_the__") }}
            </p>
          </div>
          <div class="border-D-b w-D-230 border-white"></div>
        </div>
      </div>
      <div class="w-D-521 relative flex flex-col">
        <NuxtImg class="left-D-100 top-D-400 w-D-528 absolute" src="images/home/vision.png" />
        <div class="border-D-e flex-1 border-white"></div>
        <div class="border-D-b h-D-100 w-full border-white"></div>
      </div>
      <div class="border-D-e flex flex-1 border-white">
        <div class="border-D-b relative flex-1 border-white">
          <p class="top-D--60 left-D-20 absolute">
            {{ $t("home.vision.we_are_putting__") }}
          </p>
          <NuxtImg class="bottom-D-100 w-D-250 left-D-300 absolute" src="/images/home/figure-2.png" />
        </div>
        <div class="w-D-154"></div>
      </div>
      <div class="w-D-154"></div>
    </div>

    <div class="h-D-242 flex">
      <div class="border-D-e w-D-588 relative flex h-full border-white">
        <button
          class="on-hover border-D text-D-30 ps-D-30 pe-D-30 right-D-30 top-D-40 absolute font-semibold ring-white"
          @click="onClickButton"
        >
          {{ $t("home.vision.featured_vlogs") }}
        </button>
      </div>
      <div class="border-D-e flex-1 border-white">
        <p class="m-D-30 w-4/5">
          {{ $t("home.vision.featuring_real__") }}
        </p>
      </div>
      <div class="w-D-154"></div>
    </div>
    <div class="h-D-100 flex">
      <div class="border-D-e flex-1 border-white"></div>
      <div class="w-D-154"></div>
    </div>
  </div>

  <div class="text-M-16 leading-M-24 mt-M-54 block md:hidden">
    <div class="me-M-30 ms-M-30 mb-M-30">
      <NuxtImg class="mb-M-22 w-full" src="images/home/vision.png" />
      <!-- <UDivider class="mb-M-37" /> -->
      <p>{{ $t("home.vision.we_unite_the__") }}</p>
    </div>
    <!-- <UDivider class="mb-M-35" /> -->
    <p class="me-M-30 ms-M-30 mb-M-35 text-right">
      {{ $t("home.vision.we_are_putting__") }}
    </p>
    <!-- <UDivider class="mb-M-35" /> -->
    <p class="me-M-30 ms-M-30 mb-M-35">
      {{ $t("home.vision.this_is_the__") }}
    </p>
    <!-- <UDivider class="mb-M-35" /> -->
    <p class="me-M-30 ms-M-30 mb-M-35 text-right">
      {{ $t("home.vision.featuring_real__") }}
    </p>
    <div class="on-hover border-M me-M-30 ms-M-30 mb-M-35 flex justify-center border-white" @click="onClickButton">
      <span class="text-M-14 font-semibold">
        {{ $t("home.vision.featured_vlogs") }}
      </span>
    </div>

    <NuxtLinkLocale class="on-hover left-D-150 absolute top-1/2" to="/about-fraudvision">
      <!-- <div class="on-hover flex items-center" @click="goToLearnMore"> -->
      <div class="w-M-30"></div>

      <div class="h-M-80 flex flex-col items-center">
        <span class="text-M-15 font-semibold">
          {{ $t("home.vision.learn_more__") }}
        </span>
        <NuxtImg class="w-M-259" src="images/home/arrow-to-right.svg" />
      </div>
      <div class="w-M-30 h-M-80">
        <!-- <div class="w-M-7 border-M-e h-full border-white"></div> -->
      </div>
    </NuxtLinkLocale>
    <!-- </div> -->
  </div>
</template>

<style scoped></style>
