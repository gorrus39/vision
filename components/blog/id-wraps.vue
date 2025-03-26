<script setup></script>

<template>
  <div class="border-D-s border-D-e border-D-t hidden border-white md:block">
    <slot name="content" />
  </div>
  <div class="border-M-s border-M-e border-M-t block border-white md:hidden">
    <slot name="content" />
  </div>

  <div
    class="border-D md:block, ms-auto hidden rounded-[5vw] border-white ps-M-10 pe-M-10 text-M-14 md:rounded-[2vw] md:pt-D-2 md:ps-D-10 md:pe-D-10 md:text-D-18"
  >
    <slot name="category" />
  </div>

  <div
    class="'block border-M', ms-auto rounded-[5vw] border-white ps-M-10 pe-M-10 text-M-14 md:hidden md:rounded-[2vw] md:pt-D-2 md:ps-D-10 md:pe-D-10 md:text-D-18"
  >
    <slot name="category" />
  </div>
</template>
