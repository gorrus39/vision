<script setup lang="ts"></script>

<template>
  <div class="hidden mb-D-80 ms-D-168 me-D-182 md:block">
    <div class="flex items-center gap-D-50">
      <p class="font-bebas-neue text-D-250">
        {{ $t("home.always_relevant.relevant") }}
      </p>
      <p class="text-D-24 leading-D-36">
        {{
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.".toUpperCase()
        }}
      </p>
    </div>

    <div class="relative flex">
      <div class="absolute w-max -rotate-90 left-D--185 top-D-120 leading-D-200">
        <p class="font-bebas-neue text-right text-D-250">{{ $t("home.always_relevant.always") }}</p>
        <UDivider size="xl" />
      </div>
      <div class="ms-auto bg-white h-D-493 w-D-1285"></div>
    </div>
  </div>

  <div class="block me-M-30 ms-M-30 mb-M-44 md:hidden">
    <p class="font-bebas-neue mb-M-40 text-M-50 leading-M-60">
      {{ $t("home.always_relevant.always") }} {{ $t("home.always_relevant.relevant") }}
    </p>

    <div class="w-full bg-white mb-M-13 h-M-305"></div>

    <p class="leading-M24 text-M-16">
      {{
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.".toUpperCase()
      }}
    </p>
  </div>
</template>
