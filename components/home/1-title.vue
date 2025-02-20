<script setup lang="ts">
const toast = useToast();
</script>

<template>
  <div class="hidden md:flex">
    <div class="w-D-155 border-D-e border-white"></div>
    <div class="border-D-b flex flex-1 border-white">
      <div class="ps-D-28 w-D-732 relative">
        <p
          class="top-D-144 font-bebas-neue leading-D-75 text-D-62 absolute w-max"
        >
          VISION SAVES YOU WEEKS AND MONTHS OF <br />
          DIGGING THROUGH FORUMS, CHATS, <br />
          CHANNELS, AND BLOGS.
        </p>
      </div>
      <div class="flex w-full flex-col">
        <div class="h-D-593 border-D-b relative border-white">
          <p class="top-D-383 text-D-38 absolute">*VIDEO*</p>
        </div>
        <div class="h-D-359 flex flex-col">
          <div class="text-D-24 leading-D-36 flex">
            <span class="pt-D-43 mx-auto">
              SAY GOODBYE TO OUTDATED 2012 FORUM DESIGNS AND SITES <br />
              RUN BY PEOPLE WHO ARE OUT OF TOUCH WITH THE COMMUNITY.
            </span>
          </div>
          <div class="h-D-100 border-D-e relative mt-auto flex border-white">
            <div
              class="on-hover me-D-100 ms-auto"
              @click="toast.add({ title: 'Soon!)' })"
            >
              <NuxtImg
                class="right-D-75 top-D--25 h-D-100 absolute"
                src="/images/home/arrow-to-bottom.svg"
              />
              <span class="text-D-28 font-bold"> TOP PROJECTS </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-D-154 border-D-b border-white"></div>
  </div>
  <div class="h-M-499 flex md:hidden">
    <div class="w-M-23 border-M-e border-white"></div>
    <div class="border-M-b flex flex-1 flex-col border-white">
      <div class="flex flex-1">
        <span class="text-M-18 m-auto">*VIDEO*</span>
      </div>
      <p class="ms-M-7 text-M-26 font-bebas-neue leading-M-32 mb-M-37">
        LOREM IPSUM DOLOR SIT <br />
        AMET, CONSECTETUER <br />
        ADIPISCING ELIT.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
