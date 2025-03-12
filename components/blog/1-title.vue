<script setup lang="ts">
// import { getBlogImageUrl } from "~/server/utils/helpers/blog";

// const items = ref([])
</script>

<template>
  <BlogAdminExternalBar />

  <!-- <img :src="getBlogImageUrl('images/2.jpg')" alt="2" /> -->
  <div
    class="font-secondary text-center mt-M-20 mb-M-40 me-D-185 ms-D-185 md:mt-D-20 md:mb-D-40"
  >
    <p class="text-M-36 md:text-D-62">VISION BLOG</p>
    <UDivider class="hidden md:block" size="xl" />
    <p class="leading text-M-24 md:text-D-52">
      STAY TUNED FOR EVERYTHING HAPPENING ON VISION.
    </p>
    <UDivider class="block mt-M-30 md:hidden" />
  </div>
</template>
