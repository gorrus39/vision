<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <div
    class="flex flex-col me-M-10 ms-M-28 gap-M-30 mb-M-40 mt-M-40 md:mt-0 md:gap-D-50 md:mb-D-50 md:ms-D-183 md:me-D-400"
  >
    <AboutFraudvisionTextWrap :text="t('about_fraudvision.text6')" />
    <b
      ><p class="text-M-26 md:text-D-62">{{ $t("about_fraudvision.text7") }}</p></b
    >
  </div>
</template>
