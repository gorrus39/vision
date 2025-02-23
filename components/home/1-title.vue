<script setup lang="ts">
const toast = useToast();
</script>

<template>
  <div class="hidden md:flex">
    <div class="border-D-e border-white w-D-154"></div>
    <div class="border-D-b flex flex-1 border-white">
      <div class="relative ps-D-28 w-D-732">
        <p
          class="font-bebas-neue absolute w-max text-D-62 leading-D-75 top-D-144"
        >
          VISION SAVES YOU WEEKS AND MONTHS OF <br />
          DIGGING THROUGH FORUMS, CHATS, <br />
          CHANNELS, AND BLOGS.
        </p>
      </div>
      <div class="flex w-full flex-col">
        <div class="border-D-b relative border-white h-D-593">
          <p class="absolute text-D-38 top-D-383">*VIDEO*</p>
        </div>
        <div class="flex flex-col h-D-359">
          <div class="flex text-D-24 leading-D-36">
            <span class="mx-auto pt-D-43">
              SAY GOODBYE TO OUTDATED 2012 FORUM DESIGNS AND SITES <br />
              RUN BY PEOPLE WHO ARE OUT OF TOUCH WITH THE COMMUNITY.
            </span>
          </div>
          <div class="border-D-e relative mt-auto flex border-white h-D-100">
            <div
              class="on-hover ms-auto me-D-100"
              @click="toast.add({ title: 'Soon!)' })"
            >
              <NuxtImg
                class="absolute top-D--25 right-D-75 h-D-100"
                src="/images/home/arrow-to-bottom.svg"
              />
              <span class="font-bold text-D-28"> TOP PROJECTS </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-D-b border-white w-D-154"></div>
  </div>
  <div class="flex h-M-499 md:hidden">
    <div class="border-M-e border-white w-M-23"></div>
    <div class="border-M-b flex flex-1 flex-col border-white">
      <div class="flex flex-1">
        <span class="m-auto text-M-18">*VIDEO*</span>
      </div>
      <p class="font-bebas-neue ms-M-7 text-M-26 leading-M-32 mb-M-37">
        LOREM IPSUM DOLOR SIT <br />
        AMET, CONSECTETUER <br />
        ADIPISCING ELIT.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
