<script setup lang="ts">
import type { BlogItem } from "~/types/all";
const store = useInitializedBlogStore();
const { items_view } = storeToRefs(store);

const toast = useToast();

// const blogItem: BlogItem = {
//   id: 1,
//   category: BlogItemCategory.categories,
//   date: new Date(),
//   title: "Lorem ipsum dolor ",
//   text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
// };

const goToAllArticles = () => {
  toast.add({ title: "Soon!)" });
};
</script>

<template>
  <div class="hidden md:block">
    <div class="flex h-D-306">
      <div class="border-D-e relative border-white w-D-154">
        <div class="absolute bg-black right-D--5 w-D-10 h-D-100"></div>
      </div>
      <div class="border-D-b grid flex-1 grid-cols-3 border-white">
        <div class="border-D-e relative border-white">
          <div class="absolute bg-black right-D--5 w-D-10 h-D-250"></div>
        </div>
        <div class="border-D-e relative border-white">
          <p
            class="font-bebas-neue absolute top-1/4 w-max right-D--30 text-D-160 leading-D-180"
          >
            VISION BLOG
          </p>
        </div>
        <div></div>
      </div>
      <div class="w-D-155"></div>
    </div>

    <div class="flex">
      <div class="border-D-e border-D-b relative border-white w-D-154">
        <div class="absolute bg-black bottom-D--5 h-D-10 w-D-70"></div>
      </div>
      <div class="border-D-b grid flex-1 grid-cols-3 border-white">
        <div class="border-D-e border-white">
          <HomeBlogItem :blogItem="items_view[0]" />
        </div>
        <div class="border-D-e border-white">
          <HomeBlogItem :blogItem="items_view[1]" />
        </div>
        <div class="border-D-e relative flex border-white p-D-29">
          <div
            class="absolute right-0 bg-black bottom-D--5 h-D-10 w-D-50"
          ></div>
          <div class="absolute top-0 bg-black right-D--5 w-D-10 h-D-50"></div>
          <p class="font-bebas-neue m-auto text-D-52 leading-D-62">
            {{ "Stay tuned for everything happening on Vision.".toUpperCase() }}
          </p>
        </div>
      </div>
      <div class="w-D-155"></div>
    </div>

    <div class="flex">
      <div class="border-D-e border-white w-D-154"></div>
      <div class="border-D-b grid flex-1 grid-cols-3 border-white">
        <div class="border-D-e relative flex border-white p-D-29">
          <div
            class="absolute bottom-0 bg-black right-D--5 w-D-10 h-D-180"
          ></div>
          <div class="relative m-auto flex w-full flex-col">
            <div class="flex w-full justify-between">
              <p class="font-bebas-neue text-D-150 leading-D-180">ALL</p>
              <NuxtImg
                class="on-hover rotate-180 w-D-124"
                @click="goToAllArticles"
                src="images/home/arrow-link.svg"
              />
            </div>
            <p class="font-bebas-neue text-D-150 leading-D-180">ARTICLES</p>
          </div>
        </div>

        <div class="border-D-e relative border-white">
          <HomeBlogItem :blogItem="items_view[2]" />
          <div
            class="border-D-e absolute border-white bottom-D--50 right-D--1 h-D-50"
          ></div>
        </div>
        <div class="border-D-e relative border-white">
          <div
            class="absolute bottom-0 bg-black right-D--5 w-D-10 h-D-180"
          ></div>
          <div
            class="absolute bg-black right-D--5 bottom-D--5 h-D-10 w-D-100"
          ></div>

          <HomeBlogItem :blogItem="items_view[3]" />
        </div>
      </div>
      <div class="w-D-155"></div>
    </div>
  </div>

  <div class="block md:hidden">
    <div class="flex">
      <div class="border-M-e border-M-b relative border-white w-M-23">
        <div class="absolute bg-black right-M--5 w-M-10 h-M-80"></div>
        <div class="absolute bg-black bottom-M--5 w-M-10 h-M-10"></div>
      </div>
      <p
        class="font-bebas-neue border-M-e border-M-b w-full flex-1 border-white text-center pb-M-23 text-M-50"
      >
        VISION BLOG
      </p>
      <div class="w-M-24"></div>
    </div>

    <div class="flex">
      <div class="border-M-e border-white w-M-23"></div>
      <div class="border-M-e border-M-b flex-1 border-white">
        <HomeBlogItem :blogItem="items_view[0]" mobile />
      </div>
      <div class="border-M-b border-white w-M-24"></div>
    </div>

    <div class="flex">
      <div class="border-M-e border-white w-M-23"></div>
      <div class="border-M-e border-M-b flex-1 border-white p-M-7">
        <p class="font-bebas-neue text-M-42 leading-M-50 mb-M-70 mt-M-70">
          {{ "Stay tuned for everything happening on Vision.".toUpperCase() }}
        </p>
      </div>
      <div class="w-M-24"></div>
    </div>

    <div class="flex">
      <div class="border-M-e border-white w-M-23"></div>
      <div class="border-M-e border-M-b flex-1 border-white">
        <HomeBlogItem :blogItem="items_view[1]" mobile />
      </div>
      <div class="w-M-24"></div>
    </div>

    <div class="flex">
      <div class="border-M-e relative border-white w-M-23">
        <div class="absolute bottom-0 bg-black right-M--5 w-M-10 h-M-50"></div>
      </div>
      <div class="border-M-e border-M-b flex-1 border-white p-M-7">
        <div
          class="font-bebas-neue flex w-full flex-col mb-M-70 mt-M-70 text-M-80 leading-M-96"
        >
          <div class="flex w-full justify-between">
            <p class="">ALL</p>
            <NuxtImg
              class="on-hover rotate-180 w-M-70"
              @click="goToAllArticles"
              src="images/home/arrow-link.svg"
            />
          </div>
          <p class="">ARTICLES</p>
        </div>
      </div>
      <div class="w-M-24"></div>
    </div>
  </div>
</template>
