<script setup lang="ts">
const backgroundUrl = "/images/home/figure-2.png"
// import backgroundUrl from "~/public/images/home/figure-2.png"
</script>

<template>
  <CatalogAdminPanelEntryPoint />

  <!-- <p>asdf</p> -->
  <!-- <div
    class="h-96 w-96 border-[2px] border-solid border-red-500"
    :style="{ backgroundImage: `url(${backgroundUrl})` }"
  ></div> -->
  <p>asdf</p>
  <img class="h-10 w-10 border-[2px] border-solid border-red-500" :src="backgroundUrl" />
  <p>asdf</p>
  <NuxtImg class="h-10 w-10 border-[2px] border-solid border-red-500" :src="backgroundUrl" />
  <p>asdf</p>
  <div class="img h-96 w-96 border-[2px] border-solid border-red-500"></div>
  <p>asdf</p>

  <!-- <CatalogMain /> -->
</template>

<style>
.img {
  background: center no-repeat url(/_nuxt/public/images/home/figure-1.png);
  background-size: 100% 100%;
  top: 0;
  position: relative;
  cursor: pointer;
  /* transition: 1s all; */
  /* overflow: hidden; */
}

.img::after {
  content: "";
  position: absolute;
  top: -25%;
  left: -25%;
  width: 150%;
  height: 150%;
  background: inherit;
  filter: blur(0px);
  opacity: 0;
  transition: 0.5s ease-in-out;
  z-index: -1;
}

.img:hover::after {
  filter: blur(50px);
  opacity: 1;
}
</style>
