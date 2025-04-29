<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <div class="me-M-10 ms-M-28 mb-M-40 mt-M-40 md:mt-0 md:gap-D-50 md:mb-D-50 md:ms-D-183 md:me-D-400">
    <AboutFraudvisionTextWrap :text="t('about_fraudvision.text8')" />
    <br />
    <br />
    <AboutFraudvisionTextWrap :text="t('about_fraudvision.text9')" />
  </div>
</template>
