<script setup lang="ts">
const homeLink = { label: "VISION", path: "#" };

const navLinks = [
  { label: "CATALOGUE", path: "#" },
  { label: "BLOG", path: "#" },
  { label: "F.A.Q.", path: "#" },
  { label: "ABOUT FRAUDVISION", path: "#" },
  { label: "CONTACT US", path: "#" },
];
</script>

<template>
  <nav class="x-border-b h-desc-20 md:flex">
    <div class="x-w-indent x-border-e"></div>
    <ul>
      <li class="aaa w-desc-100">1</li>
      <li class="tex-desc42">2</li>
      <li class="tex-desc-[42px]">3</li>
      <li class="tex-desc42px">4</li>
      <div class="tex-desc-&lsqb;42px&rsqb;">5</div>
      <div class="tex-desc-42">6</div>
      <div class="tex-desc-42">6</div>
      <div class="text-desc-100">plugin</div>
      <div class="text-d-72">theme</div>
      <div class="text-yellow-600">tailwind</div>
    </ul>
    <NuxtLink
      class="x-ps tex-desc-42 x-border-e flex w-[35.7vw] items-center"
      :to="homeLink.path"
    >
      <span class="on-hover"> {{ homeLink.label }} </span>
    </NuxtLink>

    <div class="x-ps flex items-center gap-[4.2vw]">
      <NuxtLink
        class="text-x-20 on-hover"
        v-for="link in navLinks"
        :to="link.path"
        >{{ link.label }}</NuxtLink
      >
    </div>
  </nav>
</template>

<style scoped></style>
