<script setup lang="ts">
const showMobileNavigation = ref(false);

const homeLink = { label: "VISION", path: "#" };

const navLinks = [
  { label: "CATALOGUE", path: "#" },
  { label: "BLOG", path: "#" },
  { label: "F.A.Q.", path: "#" },
  { label: "ABOUT FRAUDVISION", path: "#" },
  { label: "CONTACT US", path: "#" },
];

const toast = useToast();
</script>

<template>
  <div class="border-D-b h-D-128 hidden border-white md:flex">
    <div class="w-D-155 border-D-e border-white"></div>
    <NuxtLink
      class="text-D-42 border-D-e ps-D-28 w-D-686 flex items-center border-white"
      :to="homeLink.path"
      @click="toast.add({ title: 'Soon!)' })"
    >
      <span class="on-hover"> {{ homeLink.label }} </span>
    </NuxtLink>

    <nav class="ps-D-22 gap-D-80 flex items-center">
      <NuxtLink
        class="text-D-20 on-hover"
        v-for="link in navLinks"
        :to="link.path"
        @click="toast.add({ title: 'Soon!)' })"
        >{{ link.label }}</NuxtLink
      >
    </nav>
  </div>

  <div class="border-M-b h-M-69 flex border-white md:hidden">
    <div
      class="ps-M-13 pe-M-13 absolute z-10 flex h-full w-full flex-col bg-black"
      v-if="showMobileNavigation"
    >
      <NuxtImg
        class="w-M-23 on-hover top-M-36 left-M-36 absolute"
        src="/images/home/close-button.svg"
        @click="showMobileNavigation = false"
      />

      <nav class="gap-M-22 m-auto flex flex-col items-center">
        <NuxtLink
          class="text-M-14 on-hover"
          v-for="link in navLinks"
          :to="link.path"
          @click="toast.add({ title: 'Soon!)' })"
          >{{ link.label }}</NuxtLink
        >
      </nav>
      <div class="h-M-129 pt-M-11">
        <span class="text-M-20 border-M-t flex justify-center border-white">
          THAT`S THE VISION
        </span>
      </div>
    </div>

    <div class="w-M-23 border-M-e border-white"></div>
    <div class="ps-M-7 relative flex w-full">
      <NuxtImg
        class="w-M-20 on-hover absolute top-1/2 -translate-y-1/2"
        src="/images/home/burger.svg"
        @click="showMobileNavigation = true"
      />
      <span class="text-M-18 m-auto"> VISION </span>
    </div>
  </div>
</template>

<style scoped></style>
