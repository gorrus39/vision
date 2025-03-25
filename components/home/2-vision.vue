<script setup lang="ts">
const toast = useToast();

const onClickButton = () => {
  toast.add({ title: "Soon!)" });
};
const goToLearnMore = () => {
  toast.add({ title: "Soon!)" });
};
</script>

<template>
  <div class="hidden text-D-38 md:block">
    <div class="flex">
      <div class="flex flex-col w-D-1109">
        <div class="h-D-100"></div>
        <div class="border-D-b border-D-e relative border-white h-D-320">
          <p class="relative top-D-30 leading-D-57 left-D-183 w-D-860">
            {{ $t("home.vision.we_unite_the__") }}
          </p>
        </div>
      </div>

      <div class="border-D-e relative flex flex-1 border-white">
        <div class="on-hover absolute top-1/2 left-D-150" @click="goToLearnMore">
          <NuxtImg class="absolute bottom-D-1 w-D-600" src="images/home/arrow-to-right.svg" />
          <span class="font-semibold text-D-30">
            {{ $t("home.vision.learn_more__") }}
          </span>
        </div>
        <div class="border-D-b border-white w-D-500"></div>
        <div class="flex-1"></div>
      </div>

      <div class="w-D-154"></div>
    </div>

    <div class="flex h-D-938">
      <div class="flex flex-col w-D-588">
        <div class="h-D-80"></div>
        <div class="border-D-e flex flex-1 border-white">
          <div class="relative flex-1">
            <NuxtImg class="absolute left-D-200 w-D-400" src="images/home/figure-1.png" format="png" />
            <p class="absolute left-D-200 w-D-580 top-D-600">
              {{ $t("home.vision.this_is_the__") }}
            </p>
          </div>
          <div class="border-D-b border-white w-D-230"></div>
        </div>
      </div>
      <div class="relative flex flex-col w-D-521">
        <NuxtImg class="absolute left-D-100 top-D-400 w-D-528" src="images/home/vision.png" />
        <div class="border-D-e flex-1 border-white"></div>
        <div class="border-D-b w-full border-white h-D-100"></div>
      </div>
      <div class="border-D-e flex flex-1 border-white">
        <div class="border-D-b relative flex-1 border-white">
          <p class="absolute top-D--60 left-D-20">
            {{ $t("home.vision.we_are_putting__") }}
          </p>
          <NuxtImg class="absolute bottom-D-100 w-D-250 left-D-300" src="/images/home/figure-2.png" />
        </div>
        <div class="w-D-154"></div>
      </div>
      <div class="w-D-154"></div>
    </div>

    <div class="flex h-D-242">
      <div class="border-D-e relative flex h-full border-white w-D-588">
        <button
          class="on-hover border-D absolute font-semibold ring-white text-D-30 ps-D-30 pe-D-30 right-D-30 top-D-40"
          @click="onClickButton"
        >
          {{ $t("home.vision.featured_vlogs") }}
        </button>
      </div>
      <div class="border-D-e flex-1 border-white">
        <p class="w-4/5 m-D-30">
          {{ $t("home.vision.featuring_real__") }}
        </p>
      </div>
      <div class="w-D-154"></div>
    </div>
    <div class="flex h-D-100">
      <div class="border-D-e flex-1 border-white"></div>
      <div class="w-D-154"></div>
    </div>
  </div>

  <div class="block text-M-16 leading-M-24 mt-M-54 md:hidden">
    <div class="me-M-30 ms-M-30 mb-M-30">
      <NuxtImg class="w-full mb-M-22" src="images/home/vision.png" />
      <UDivider class="mb-M-37" />
      <p>{{ $t("home.vision.we_unite_the__") }}</p>
    </div>
    <UDivider class="mb-M-35" />
    <p class="text-right me-M-30 ms-M-30 mb-M-35">
      {{ $t("home.vision.we_are_putting__") }}
    </p>
    <UDivider class="mb-M-35" />
    <p class="me-M-30 ms-M-30 mb-M-35">
      {{ $t("home.vision.this_is_the__") }}
    </p>
    <UDivider class="mb-M-35" />
    <p class="text-right me-M-30 ms-M-30 mb-M-35">
      {{ $t("home.vision.featuring_real__") }}
    </p>
    <div class="on-hover border-M flex justify-center border-white me-M-30 ms-M-30 mb-M-35" @click="onClickButton">
      <span class="font-semibold text-M-14">
        {{ $t("home.vision.featured_vlogs") }}
      </span>
    </div>
    <div class="on-hover flex items-center" @click="goToLearnMore">
      <div class="w-M-30"></div>

      <div class="flex flex-col items-center h-M-80">
        <span class="font-semibold text-M-15">
          {{ $t("home.vision.learn_more__") }}
        </span>
        <NuxtImg class="w-M-259" src="images/home/arrow-to-right.svg" />
      </div>
      <div class="w-M-30 h-M-80">
        <!-- <div class="w-M-7 border-M-e h-full border-white"></div> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
