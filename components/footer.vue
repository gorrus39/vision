<script setup lang="ts"></script>

<template>
  <div class="hidden me-D-155 ms-D-155 md:block">
    <div class="grid grid-cols-3">
      <p class="border-D-e flex border-white text-D-38">
        <span class="mb-auto mt-auto">{{ $t("footer.vision") }}</span>
      </p>
      <p class="border-D-e flex border-white text-center text-D-30">
        <span class="m-auto">{{ $t("footer.thats_the_vision") }}</span>
      </p>
      <nav class="flex flex-col text-right text-D-20 gap-D-20 mb-D-37 mt-D-37">
        <p class="on-hover">{{ $t("header.catalogue") }}</p>
        <p class="on-hover">{{ $t("header.blog") }}</p>
        <p class="on-hover">{{ $t("header.faq") }}</p>
        <p class="on-hover">{{ $t("header.about_fraudvision") }}</p>
        <p class="on-hover">{{ $t("header.contact_us") }}</p>
      </nav>
    </div>
    <UDivider size="xl" />
    <p class="font-inter text-center font-light text-[#DADADA] text-D-15 mb-D-21 mt-D-21">
      {{ $t("footer.all_rights__") }}
    </p>
  </div>

  <div class="flex flex-col gap-M-15 mb-M-15 mt-M-15 me-M-23 ms-M-23 md:hidden">
    <p class="text-center text-M-18">{{ $t("footer.vision") }}</p>
    <UDivider />
    <p class="text-center text-M-16">{{ $t("footer.thats_the_vision") }}</p>
    <UDivider />
    <p class="text-center text-M-14">{{ $t("header.catalogue") }}</p>
    <p class="text-center text-M-14">{{ $t("header.blog") }}</p>
    <p class="text-center text-M-14">{{ $t("header.faq") }}</p>
    <p class="text-center text-M-14">{{ $t("header.about_fraudvision") }}</p>
    <p class="text-center text-M-14">{{ $t("header.contact_us") }}</p>
    <UDivider />
    <p class="font-inter text-center font-light text-[#DADADA] text-M-10">{{ $t("footer.all_rights__") }}</p>
  </div>
</template>
