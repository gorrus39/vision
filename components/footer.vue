<script setup lang="ts"></script>

<template>
  <div class="border-D-t hidden border-white md:block">
    <div class="me-D-155 ms-D-155">
      <div class="grid grid-cols-3">
        <p class="border-D-e flex border-white text-D-38">
          <span class="mb-auto mt-auto">
            <NuxtLinkLocale class="on-hover" to="/">
              {{ $t("footer.vision") }}
            </NuxtLinkLocale>
          </span>
        </p>

        <p class="border-D-e flex border-white text-center text-D-30">
          <NuxtLinkLocale class="on-hover m-auto" to="/about-fraudvision">
            {{ $t("footer.thats_the_vision") }}
          </NuxtLinkLocale>
        </p>

        <nav class="flex flex-col text-right text-D-20 gap-D-20 mb-D-37 mt-D-37">
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
      <UDivider size="xl" />
      <p class="font-inter text-center font-light text-[#DADADA] text-D-15 mb-D-21 mt-D-21">
        {{ $t("footer.all_rights__") }}
      </p>
    </div>
  </div>

  <div class="flex flex-col gap-M-15 mb-M-15 mt-M-15 me-M-23 ms-M-23 md:hidden">
    <NuxtLinkLocale to="/">
      <p class="text-center text-M-18">{{ $t("footer.vision") }}</p>
    </NuxtLinkLocale>

    <UDivider />

    <NuxtLinkLocale to="/about-fraudvision">
      <p class="text-center text-M-16">{{ $t("footer.thats_the_vision") }}</p>
    </NuxtLinkLocale>

    <UDivider />

    <NuxtLinkLocale to="/catalog">
      <p class="text-center text-M-14">{{ $t("header.catalogue") }}</p>
    </NuxtLinkLocale>

    <NuxtLinkLocale to="/blog">
      <p class="text-center text-M-14">{{ $t("header.blog") }}</p>
    </NuxtLinkLocale>

    <NuxtLinkLocale to="/faq">
      <p class="text-center text-M-14">{{ $t("header.faq") }}</p>
    </NuxtLinkLocale>

    <NuxtLinkLocale to="/about-fraudvision">
      <p class="text-center text-M-14">{{ $t("header.about_fraudvision") }}</p>
    </NuxtLinkLocale>

    <NuxtLinkLocale to="/contacts">
      <p class="text-center text-M-14">{{ $t("header.contact_us") }}</p>
    </NuxtLinkLocale>

    <UDivider />
    <p class="font-inter text-center font-light text-[#DADADA] text-M-10">{{ $t("footer.all_rights__") }}</p>
  </div>
</template>
