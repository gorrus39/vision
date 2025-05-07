<script setup lang="ts">
import { NuxtLinkLocale } from "#components"

const showMobileNavigation = ref(false)

const homeLink = { label: "VISION", path: "/" }
const navLinks = [
  { labelPath: "header.catalogue", path: "/catalog" },
  { labelPath: "header.blog", path: "/blog" },
  { labelPath: "header.faq", path: "/faq" },
  { labelPath: "header.about_fraudvision", path: "/about-fraudvision" },
  { labelPath: "header.contact_us", path: "/contacts" },
]

const toast = useToast()

const toggle = ref(true)
</script>

<template>
  <div class="border-D-b hidden border-white h-D-128 md:flex">
    <div class="border-D-e border-white w-D-154"></div>

    <div class="border-D-e flex items-center border-white ps-D-28 text-D-42 w-D-686">
      <NuxtLinkLocale class="on-hover" :to="homeLink.path">
        {{ homeLink.label }}
      </NuxtLinkLocale>
    </div>

    <nav class="flex items-center ps-D-22 gap-D-70">
      <NuxtLinkLocale
        class="on-hover text-D-20"
        v-for="link in navLinks"
        :to="link.path"
        @click="link.path == '#' ? toast.add({ title: 'Soon!)' }) : () => {}"
        >{{ $t(link.labelPath) }}</NuxtLinkLocale
      >
      <Language />
    </nav>
  </div>

  <div class="border-M-b flex border-white h-M-69 md:hidden">
    <div class="fixed z-50 flex h-full w-full flex-col bg-black ps-M-13 pe-M-13" v-if="showMobileNavigation">
      <NuxtImg
        class="on-hover absolute w-M-23 top-M-36 left-M-36"
        src="/images/home/close-button.svg"
        @click="showMobileNavigation = false"
      />

      <nav class="m-auto flex flex-col items-center gap-M-22">
        <NuxtLinkLocale
          class="on-hover text-M-14"
          v-for="link in navLinks"
          :to="link.path"
          @click="showMobileNavigation = false"
          >{{ $t(link.labelPath) }}</NuxtLinkLocale
        >
      </nav>
      <div class="border-M-t border-white pt-M-11 h-M-129">
        <NuxtLinkLocale
          class="on-hover flex justify-center text-M-20"
          @click="showMobileNavigation = false"
          :to="navLinks[3].path"
          >{{ $t("header.thats_the_vision") }}
        </NuxtLinkLocale>
      </div>
    </div>

    <div class="border-M-e border-white w-M-23"></div>
    <div class="grid flex-1 grid-cols-3 items-center justify-between">
      <NuxtImg class="on-hover ms-M-7 w-M-20" src="/images/home/burger.svg" @click="showMobileNavigation = true" />

      <NuxtLinkLocale class="m-auto text-center text-M-18" @click="showMobileNavigation = false" :to="homeLink.path">{{
        homeLink.label
      }}</NuxtLinkLocale>

      <Language />
    </div>
  </div>
</template>

<style scoped></style>
