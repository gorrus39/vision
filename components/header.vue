<script setup lang="ts">
import { NuxtLinkLocale } from "#components"
const { user, clear, loggedIn } = useUserSession()

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
  <div class="border-D-b h-D-128 hidden border-white md:flex">
    <div class="border-D-e w-D-154 relative border-white">
      <u-button
        class="absolute top-2 left-2"
        v-if="loggedIn"
        :label="`logout ${user && 'email' in user && user.email}`"
        @click="clear"
      />

      <NuxtLinkLocale v-if="loggedIn" to="/admin">
        <u-button class="absolute top-12 left-2" label="to admin" />
      </NuxtLinkLocale>
    </div>

    <div class="border-D-e ps-D-28 text-D-42 w-D-686 flex items-center border-white">
      <NuxtLinkLocale class="on-hover" :to="homeLink.path">
        {{ homeLink.label }}
      </NuxtLinkLocale>
    </div>

    <nav class="ps-D-22 gap-D-70 relative flex items-center">
      <!-- <NuxtLinkLocale class="absolute bottom-[-40px] z-100" to="/admin/faq">admin-faq</NuxtLinkLocale> -->
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

  <div class="border-M-b h-M-69 flex border-white md:hidden">
    <div class="ps-M-13 pe-M-13 fixed z-50 flex h-full w-full flex-col bg-black" v-if="showMobileNavigation">
      <NuxtImg
        class="on-hover w-M-23 top-M-36 left-M-36 absolute"
        src="/images/home/close-button.svg"
        @click="showMobileNavigation = false"
      />

      <nav class="gap-M-22 m-auto flex flex-col items-center">
        <NuxtLinkLocale
          class="on-hover text-M-14"
          v-for="link in navLinks"
          :to="link.path"
          @click="showMobileNavigation = false"
          >{{ $t(link.labelPath) }}</NuxtLinkLocale
        >
      </nav>
      <div class="border-M-t pt-M-11 h-M-129 border-white">
        <NuxtLinkLocale
          class="on-hover text-M-20 flex justify-center"
          @click="showMobileNavigation = false"
          :to="navLinks[3].path"
          >{{ $t("header.thats_the_vision") }}
        </NuxtLinkLocale>
      </div>
    </div>

    <div class="border-M-e w-M-23 border-white"></div>
    <div class="grid flex-1 grid-cols-3 items-center justify-between">
      <NuxtImg class="on-hover ms-M-7 w-M-20" src="/images/home/burger.svg" @click="showMobileNavigation = true" />

      <NuxtLinkLocale class="text-M-18 m-auto text-center" @click="showMobileNavigation = false" :to="homeLink.path">{{
        homeLink.label
      }}</NuxtLinkLocale>

      <Language />
    </div>
  </div>
</template>

<style scoped></style>
