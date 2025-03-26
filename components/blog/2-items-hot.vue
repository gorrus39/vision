<script setup lang="ts"></script>

<template>
  <div class="mb-M-80 me-D-155 ms-D-156 md:mb-D-95">
    <div class="flex gap-M-5 md:gap-D-10">
      <p class="font-bebas-neue text-M-36 md:text-D-62">
        {{ $t("blog.hot_news.hot_news") }}
      </p>
      <NuxtImg class="w-M-18 md:w-D-34" src="images/blog/fire.svg" />
    </div>

    <BlogItemsHotNews />
  </div>
</template>
