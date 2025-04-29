<script setup lang="ts">
const config = useRuntimeConfig()
const links = [
  { name: "telegram", link: config.public.links.telegram },
  { name: "signal", link: config.public.links.signal },
  { name: "watsapp", link: config.public.links.watsapp },
]
</script>
<template>
  <div class="x-mx flex flex-col justify-between gap-M-20 md:flex-row md:gap-0 md:mb-D-50">
    <NuxtLink
      class="on-hover relative flex w-full flex-col overflow-hidden rounded-xl border-[1px] border-solid border-white md:rounded-lg md:border-[2px] md:w-D-480"
      v-for="item in links"
      :to="item.link"
    >
      <NuxtImg class="absolute h-full w-full" src="images/default/catalog-item-img-short/background-black.png" />

      <div class="relative z-10 p-M-10 m-M-10 md:p-D-20 md:m-D-20">
        <NuxtImg class="ms-auto w-M-20 h-M-20 md:w-D-30 md:h-D-30" src="/images/home/arrow-link.svg" />
        <div class="flex items-center gap-M-25 md:gap-D-26">
          <NuxtImg class="rounded-full w-M-35 h-M-35 md:w-D-60 md:h-D-60" :src="`images/contacts/${item.name}.png`" />
          <div class="flex flex-1 flex-col">
            <p class="font-semibold text-M-12 md:text-D-26">{{ $t(`contacts.link.${item.name}`) }}</p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
