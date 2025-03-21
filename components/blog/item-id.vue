<script setup lang="ts">
import { getBlogImageUrl } from "~/server/utils/helpers/blog";

const route = useRoute();

const id = route.params.id;
const store = useInitializedBlogStore();
const { items_view } = storeToRefs(store);

const item = ref(items_view.value.find((item) => item.id === +id));

const image_paths = computed(() => {
  return item.value?.image_paths.filter((path) => path !== null);
});
</script>

<template>
  <div class="me-M-15 ms-M-30 mt-M-40 md:mt-D-69 md:ms-D-154 md:me-D-155" v-if="item">
    <div class="flex items-center me-D-29 ms-D-29">
      <div class="text-M-16 md:text-D-22">
        {{ formatDate(item.published_at) }}
      </div>
      <div
        :class="[
          'border-local-category ms-auto rounded-[5vw] border-white ps-M-10 pe-M-10 text-M-14 md:rounded-[2vw] md:pt-D-2 md:ps-D-10 md:pe-D-10 md:text-D-18',
        ]"
      >
        {{ item.category }}
      </div>
    </div>
    <p class="font-bebas-neue ms-D-29 text-M-32 md:text-D-62">
      {{ item.title }}
    </p>

    <div class="border-local-content border-white">
      <div class="m-M-11 md:m-D-63">
        <img
          class="w-full mb-M-13 md:mb-D-48"
          v-for="path of image_paths"
          :src="getBlogImageUrl(path)"
          alt="blog-item-img"
        />
        <p class="font-bebas-neue mb-M-5 text-M-26 md:mb-D-48 md:text-D-52" v-if="item.sub_title">
          {{ item.sub_title }}
        </p>
        <p class="text-M-16 md:text-D-24" v-html="item.text" />
        <!-- <p class="text-M-16 md:text-D-24">{{ item.text }}</p> -->
      </div>
    </div>
  </div>

  <div v-else>
    <p class="font-bebas-neue text-M-32 md:text-D-62">404</p>
  </div>
</template>

<style scoped>
.border-local-category {
  border-style: solid;

  border-width: var(--border-desktop-size);
  @media (min-width: 786) {
    border-width: var(--border-mobile-size);
  }
}
.border-local-content {
  border-style: solid;
  border-top-width: var(--border-desktop-size);
  border-left-width: var(--border-desktop-size);
  border-right-width: var(--border-desktop-size);
  @media (min-width: 786) {
    border-top-width: var(--border-mobile-size);
    border-left-width: var(--border-mobile-size);
    border-right-width: var(--border-mobile-size);
  }
}

a {
  color: white;
}
</style>
