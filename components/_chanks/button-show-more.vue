<script lang="ts" setup>
defineProps<{
  path: string;
}>();
</script>

<template>
  <NuxtLinkLocale
    class="button-gradient on-hover w-full text-center"
    :to="path"
    :class="['rounded-[1vw] p-M-5 text-M-16 md:mt-auto md:rounded-[.5vw] md:p-D-10 md:text-D-22']"
  >
    {{ $t("home.vision_blog.show_more") }}
  </NuxtLinkLocale>
</template>

<style setup>
.button-gradient {
  background: linear-gradient(to left, #c6c6c6, #ffffff 15%, #c6c6c6 26%, #848181);
}
</style>
