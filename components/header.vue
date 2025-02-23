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
  <div class="border-D-b hidden border-white h-D-128 md:flex">
    <div class="border-D-e border-white w-D-154"></div>
    <NuxtLink
      class="border-D-e flex items-center border-white ps-D-28 text-D-42 w-D-686"
      :to="homeLink.path"
      @click="toast.add({ title: 'Soon!)' })"
    >
      <span class="on-hover"> {{ homeLink.label }} </span>
    </NuxtLink>

    <nav class="flex items-center ps-D-22 gap-D-80">
      <NuxtLink
        class="on-hover text-D-20"
        v-for="link in navLinks"
        :to="link.path"
        @click="toast.add({ title: 'Soon!)' })"
        >{{ link.label }}</NuxtLink
      >
    </nav>
  </div>

  <div class="border-M-b flex border-white h-M-69 md:hidden">
    <div
      class="fixed z-10 flex h-full w-full flex-col bg-black ps-M-13 pe-M-13"
      v-if="showMobileNavigation"
    >
      <NuxtImg
        class="on-hover absolute w-M-23 top-M-36 left-M-36"
        src="/images/home/close-button.svg"
        @click="showMobileNavigation = false"
      />

      <nav class="m-auto flex flex-col items-center gap-M-22">
        <NuxtLink
          class="on-hover text-M-14"
          v-for="link in navLinks"
          :to="link.path"
          @click="toast.add({ title: 'Soon!)' })"
          >{{ link.label }}</NuxtLink
        >
      </nav>
      <div class="pt-M-11 h-M-129">
        <span class="border-M-t flex justify-center border-white text-M-20">
          THAT`S THE VISION
        </span>
      </div>
    </div>

    <div class="border-M-e border-white w-M-23"></div>
    <div class="relative flex flex-1">
      <NuxtImg
        class="on-hover absolute top-1/2 -translate-y-1/2 ms-M-7 w-M-20"
        src="/images/home/burger.svg"
        @click="showMobileNavigation = true"
      />
      <span class="m-auto text-M-18"> VISION </span>
    </div>
  </div>
</template>

<style scoped></style>
