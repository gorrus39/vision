<script setup lang="ts"></script>

<template>
  <div class="font-secondary text-center mt-M-20 mb-M-40 me-D-185 ms-D-185 md:mt-D-20 md:mb-D-40">
    <p class="text-M-36 md:text-D-62">
      {{ $t("faq.title_1") }}
    </p>
    <!-- <p> -->
    <UDivider class="hidden md:block" size="xl" />
    <!-- </p> -->

    <p class="leading text-M-24 md:text-D-52">
      {{ $t("faq.title_2") }}
    </p>
    <UDivider class="block mt-M-30 md:hidden" />
  </div>
</template>
