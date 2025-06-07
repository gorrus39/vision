<script setup lang="ts"></script>
<template>
  <div class="relative">
    <NuxtImg
      class="absolute left-[-8vw] h-auto bottom-M-40 w-M-75 md:bottom-0 md:left-0 md:w-D-110"
      src="images/contacts/figure-1.png"
      alt="decoration"
    />
    <NuxtImg
      class="absolute right-0 h-auto top-M-90 w-M-100 md:top-0 md:w-D-300"
      src="images/contacts/figure-2.png"
      alt="decoration"
    />
    <div
      class="absolute bottom-0 right-0 border-b-2 border-solid border-white w-M-260 md:border-b-[.5px] md:right-D-182 md:w-D-800"
    ></div>

    <div
      class="relative border-s-2 border-solid border-white ps-M-11 pe-M-11 ms-M-22 mb-M-30 pt-M-45 md:border-s-[.5px] md:ps-D-28 md:pe-D-28 md:mb-D-50 md:ms-D-153 md:pt-D-165"
    >
      <div class="font-secondary flex flex-col font-bold gap-M-20 text-M-32 mb-M-50 md:gap-0 md:mb-D-20 md:text-D-62">
        <p class="leading-M-40 md:leading-D-70">{{ $t("contacts.title.line1") }}</p>
        <p class="leading-M-40 md:leading-D-70">{{ $t("contacts.title.line2") }}</p>
        <p class="leading-M-40 md:leading-D-70">{{ $t("contacts.title.line3") }}</p>
      </div>
      <p class="max-w-none text-right text-M-16 pb-M-30 md:max-w-[40vw] md:pb-0 md:text-left md:text-D-38">
        {{ $t("contacts.sub_title") }}
      </p>
    </div>
  </div>
</template>
