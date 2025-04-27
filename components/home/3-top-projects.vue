<script setup lang="ts">
// import type { FullCatalogItem } from "~/types/catalog"
const store = await useInitializedCatalogItemsStore()
const { topProjects } = storeToRefs(store)

const toast = useToast()

const maxAmountMobile = 4
const maxAmountDesktop = 8

// const amount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const amountRef = ref<number>(amount[0])

const handleClickShowMore = () => {
  toast.add({ title: "Soon!)" })
}

// const itemsByAmount = () => {
//   const item = { ...topProjects.value[0] }
//   // debugger
//   const arr = Array(amountRef.value)
//   const filledArr = arr.fill(item)

//   return filledArr
// }
// const testItems = ref(itemsByAmount())

// watch(
//   () => amountRef.value,
//   () => {
//     const items = itemsByAmount()
//     // debugger
//     testItems.value = items
//   },
// )
</script>

<template>
  <!-- <div class="flex gap-2">
    <USelect v-model="amountRef" :options="amount" @update:model-value="(val) => (amountRef = +val)" />
    <p>
      {{ testItems.length }}
    </p>
    <p>
      {{ amountRef }}
    </p>
  </div> -->
  <div class="relative hidden mb-D-40 h-D-1350 md:flex" id="top-projects">
    <NuxtImg class="absolute bottom-0 z-10 left-D-50 w-D-1400" src="images/home/figure-3.png" />
    <div class="border-D-e flex flex-1 border-white">
      <div
        class="font-bebas-neue border-D-b border-D-b border-D-e relative h-max border-white text-D-150 leading-D-180 w-D-723"
      >
        <p class="relative left-D-183">{{ $t("home.top_projects.top_projects") }}</p>
      </div>

      <div class="flex flex-col ms-D-120">
        <div class="relative z-20 grid h-max grid-cols-2 mb-D-33 gap-D-70">
          <HomeProjectCard
            v-for="(project, index) in topProjects.slice(0, maxAmountDesktop)"
            :key="index"
            :project="project"
            :index="index"
            screen="desktop"
          />
        </div>
        <NuxtLinkLocale to="/catalog">
          <button class="on-hover border-D relative z-20 w-full rounded-[.5vw] border-white text-D-22">
            {{ $t("home.top_projects.show_more") }}
          </button>
        </NuxtLinkLocale>
      </div>
    </div>

    <div class="w-D-154"></div>
  </div>

  <div class="relative flex flex-col me-M-30 ms-M-30 mb-M-44 md:hidden">
    <div class="border-M-e absolute border-white top-M--90 right-M--6 h-M-490"></div>

    <p class="font-bebas-neue mb-M-32 text-M-50">{{ $t("home.top_projects.top_projects") }}</p>

    <div class="flex flex-col gap-M-19 mb-M-19">
      <HomeProjectCard
        v-for="(project, index) in topProjects.slice(0, maxAmountMobile)"
        :index="index"
        :project="project"
        screen="mobile"
      />
    </div>

    <NuxtLinkLocale to="catalog">
      <button class="on-hover border-M w-full rounded-[.5vw] border-white text-M-16">
        {{ $t("home.top_projects.show_more") }}
      </button>
    </NuxtLinkLocale>
  </div>
</template>
