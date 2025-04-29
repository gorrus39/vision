<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <div class="relative flex items-center md:gap-D-50 md:mb-D-50 md:p-D-80 md:me-D-183">
    <NuxtImg class="hidden w-D-800 md:block" src="images/about-fraudvision/figure-2.png" />
    <NuxtImg
      class="absolute bottom-[-20vw] right-0 block w-M-140 md:hidden"
      src="images/about-fraudvision/figure-1.png"
    />
    <div class="absolute bottom-[-5vw] right-0 hidden border-e-[.5px] h-D-600 md:block"></div>
    <div class="absolute bottom-0 left-[-50vw] w-[110%] border-b-[2px] md:left-[-4vw] md:border-b-[.5px]"></div>

    <div class="flex flex-col gap-M-20 me-M-23 ms-M-28 pb-M-40 md:pb-0 md:gap-D-40 md:me-D-70">
      <b><AboutFraudvisionTextWrap :text="t('about_fraudvision.text3')" /></b>

      <AboutFraudvisionTextWrap :text="t('about_fraudvision.text4')" />

      <AboutFraudvisionTextWrap :text="t('about_fraudvision.text5')" />
    </div>
  </div>
</template>
