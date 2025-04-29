<script setup lang="ts"></script>

<template>
  <div class="relative me-M-22 ms-M-22 pb-M-30 mb-M-30 md:pb-D-50 md:mb-D-50 md:me-D-153 md:ms-D-153">
    <NuxtImg
      class="absolute bottom-[-8vw] right-0 hidden w-D-300 md:block"
      src="images/about-fraudvision/figure-1.png"
    />
    <div class="absolute -left-[30vw] bottom-0 border-b-[2px] w-M-300 md:border-b-[.5px] md:w-D-1200"></div>
    <div class="absolute border-s-[2px] h-M-600 md:top-[6vw] md:border-s-[.5px] md:h-D-800"></div>

    <div class="ms-M-5 md:ms-D-57">
      <p class="font-secondary text-center font-bold text-M-50 md:text-D-150">{{ $t("about_fraudvision.title") }}</p>
      <p class="text-M-16 mb-M-30 md:text-D-38 md:mb-D-50">
        <span>{{ $t("about_fraudvision.text1.regular") }}</span>
        {{ " " }}
        <b>
          <span>{{ $t("about_fraudvision.text1.bold") }}</span></b
        >
      </p>

      <p class="text-M-16 md:text-D-38">
        <span>{{ $t("about_fraudvision.text2.regular") }}</span>
        <br />
        <b>
          <span class="text-M-32 md:text-D-62">{{ $t("about_fraudvision.text2.bold") }}</span></b
        >
      </p>
    </div>
  </div>
</template>
