<script setup lang="ts"></script>

<template>
  <div class="border-D-t hidden border-white md:block">
    <div class="me-D-155 ms-D-155">
      <div class="grid grid-cols-3">
        <p class="border-D-e text-D-38 flex border-white">
          <span class="mt-auto mb-auto">
            <NuxtLinkLocale class="on-hover" to="/">
              {{ $t("footer.vision") }}
            </NuxtLinkLocale>
          </span>
        </p>

        <p class="border-D-e text-D-30 flex border-white text-center">
          <NuxtLinkLocale class="on-hover m-auto" to="/about-fraudvision">
            {{ $t("footer.thats_the_vision") }}
          </NuxtLinkLocale>
        </p>

        <nav class="text-D-20 gap-D-20 mb-D-37 mt-D-37 flex flex-col text-right">
          <NuxtLinkLocale to="/catalog">
            <p class="on-hover">{{ $t("header.catalogue") }}</p>
          </NuxtLinkLocale>

          <NuxtLinkLocale to="/blog">
            <p class="on-hover">{{ $t("header.blog") }}</p>
          </NuxtLinkLocale>

          <NuxtLinkLocale to="/faq">
            <p class="on-hover">{{ $t("header.faq") }}</p>
          </NuxtLinkLocale>

          <NuxtLinkLocale to="/about-fraudvision">
            <p class="on-hover">{{ $t("header.about_fraudvision") }}</p>
          </NuxtLinkLocale>

          <NuxtLinkLocale to="/contacts">
            <p class="on-hover">{{ $t("header.contact_us") }}</p>
          </NuxtLinkLocale>
        </nav>
      </div>
      <!-- <UDivider size="xl" /> -->
      <p class="font-inter text-D-15 mb-D-21 mt-D-21 text-center font-light text-[#DADADA]">
        {{ $t("footer.all_rights__") }}
      </p>
    </div>
  </div>

  <div class="gap-M-15 mb-M-15 mt-M-15 me-M-23 ms-M-23 flex flex-col md:hidden">
    <NuxtLinkLocale to="/">
      <p class="text-M-18 text-center">{{ $t("footer.vision") }}</p>
    </NuxtLinkLocale>

    <!-- <UDivider /> -->

    <NuxtLinkLocale to="/about-fraudvision">
      <p class="text-M-16 text-center">{{ $t("footer.thats_the_vision") }}</p>
    </NuxtLinkLocale>

    <!-- <UDivider /> -->

    <NuxtLinkLocale to="/catalog">
      <p class="text-M-14 text-center">{{ $t("header.catalogue") }}</p>
    </NuxtLinkLocale>

    <NuxtLinkLocale to="/blog">
      <p class="text-M-14 text-center">{{ $t("header.blog") }}</p>
    </NuxtLinkLocale>

    <NuxtLinkLocale to="/faq">
      <p class="text-M-14 text-center">{{ $t("header.faq") }}</p>
    </NuxtLinkLocale>

    <NuxtLinkLocale to="/about-fraudvision">
      <p class="text-M-14 text-center">{{ $t("header.about_fraudvision") }}</p>
    </NuxtLinkLocale>

    <NuxtLinkLocale to="/contacts">
      <p class="text-M-14 text-center">{{ $t("header.contact_us") }}</p>
    </NuxtLinkLocale>

    <!-- <UDivider /> -->
    <p class="font-inter text-M-10 text-center font-light text-[#DADADA]">{{ $t("footer.all_rights__") }}</p>
  </div>
</template>
