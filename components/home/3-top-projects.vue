<script setup lang="ts">
const store = useCatalogItemsStore()
await callOnce(async () => store.initData())
const topProjects = store.topProjects

const toast = useToast()

const maxAmountMobile = 4
const maxAmountDesktop = 8

const topProjectsDesktop = topProjects.slice(0, maxAmountDesktop)
const topProjectsMobile = topProjects.slice(0, maxAmountMobile)
</script>

<template>
  <div class="mb-D-40 h-D-1350 relative hidden md:flex" id="top-projects">
    <NuxtImg class="left-D-50 w-D-1400 absolute bottom-0 z-10" src="images/home/figure-3.png" />
    <div class="border-D-e flex flex-1 border-white">
      <div
        class="font-bebas-neue border-D-b border-D-b border-D-e text-D-150 leading-D-180 w-D-723 relative h-max border-white"
      >
        <p class="left-D-183 relative">{{ $t("home.top_projects.top_projects") }}</p>
      </div>

      <div class="ms-D-120 flex flex-col">
        <div class="mb-D-33 gap-D-70 relative z-20 grid h-max grid-cols-2">
          <HomeProjectCard
            v-for="(project, index) in topProjectsDesktop"
            :key="index"
            :project="project"
            :index="index"
            screen="desktop"
          />
        </div>
        <NuxtLinkLocale to="/catalog">
          <!-- <UButton color="neutral" :label="$t('home.top_projects.show_more')" /> -->
          <button class="on-hover border-D text-D-22 relative z-20 w-full min-w-20 rounded-[.5vw] border-white">
            {{ $t("home.top_projects.show_more") }}
          </button>
        </NuxtLinkLocale>
      </div>
    </div>

    <div class="w-D-154"></div>
  </div>

  <div class="me-M-30 ms-M-30 mb-M-44 relative flex flex-col md:hidden">
    <div class="border-M-e top-M--90 right-M--6 h-M-490 absolute border-white"></div>

    <p class="font-bebas-neue mb-M-32 text-M-50">{{ $t("home.top_projects.top_projects") }}</p>

    <div class="gap-M-19 mb-M-19 flex flex-col">
      <HomeProjectCard
        v-for="(project, index) in topProjectsMobile"
        :index="index"
        :project="project"
        screen="mobile"
      />
    </div>

    <NuxtLinkLocale to="catalog">
      <button class="on-hover border-M text-M-16 w-full rounded-[.5vw] border-white">
        {{ $t("home.top_projects.show_more") }}
      </button>
    </NuxtLinkLocale>
  </div>
</template>
