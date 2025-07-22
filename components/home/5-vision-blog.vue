<script setup lang="ts"></script>

<template>
  <div class="me-D-154 ms-D-154">
    <p class="font-bebas-neue mt-D-30 mb-D-50 text-D-160 leading-D-180 text-center">
      {{ $t("home.vision_blog.vision_blog") }}
    </p>

    <BlogHotNewsItemsHotNews withInfoItems :maxItemsAmount="4" />
  </div>
</template>
