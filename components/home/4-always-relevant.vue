<script setup lang="ts">
const { locale } = useI18n()
const { loggedIn } = useUserSession()

const store = useSlugAssetsStore()

const alwaysRelevantAsset = computed(() => store.alwaysRelevantAsset)
// const modal = useModal()

import HomeAdminModalAlwaysRelevant from "~/components/home/admin/modal-always-relevant.vue"
import type { Lang } from "~/types/catalog"
const openAdminModal = () => {
  // modal.open(HomeAdminModalAlwaysRelevant, {
  //   slugAsset: alwaysRelevantAsset.value,
  // })
}

onMounted(async () => {
  await store.fetchData()
})

const getTextContentByLocale = () => {
  const asset = alwaysRelevantAsset.value
  if (!asset || !asset.text_content) return ""

  const json = JSON.parse(asset.text_content) as { ru: string; cn: string; en: string }

  const textByLocale = json[locale.value]

  if (textByLocale.length && textByLocale.length > 0) return textByLocale

  for (const any_text_content of Object.values(json)) {
    if (any_text_content && any_text_content.length > 0) return any_text_content
  }

  return ""
}
</script>

<template>
  <div class="hidden p-2 md:flex" v-if="loggedIn">
    <UButton @click="openAdminModal" icon="i-lucide:settings" label="always relevant" />
  </div>

  <div class="mb-D-80 ms-D-168 me-D-182 hidden md:block">
    <div class="gap-D-50 flex items-center">
      <p :class="['font-bebas-neue', locale == 'cn' ? 'text-D-200 w-[120vw]' : 'text-D-250']">
        {{ $t("home.always_relevant.relevant") }}
      </p>
      <p class="text-D-24 leading-D-36">
        {{ getTextContentByLocale() }}
      </p>
    </div>

    <div :class="['relative flex', { 'h-[38vw]': locale == 'cn' }]">
      <div
        :class="[
          'leading-D-200 absolute w-max -rotate-90',

          locale == 'cn' ? 'left-D--290 top-D-280' : 'left-D--185 top-D-120',
        ]"
      >
        <p :class="['font-bebas-neue text-right', locale == 'cn' ? 'text-D-200' : 'text-D-250']">
          {{ $t("home.always_relevant.always") }}
        </p>
        <!-- <UDivider size="xl" /> -->
      </div>
      <img
        class="h-D-493 w-D-1285 relative top-1/2 ms-auto object-cover"
        v-if="alwaysRelevantAsset && alwaysRelevantAsset.img_path"
        :class="[{ '-translate-y-1/2': locale == 'cn' }]"
        :src="getImg(alwaysRelevantAsset.img_path, 'slug-assets')"
      />
      <div class="h-D-493 w-D-1285 ms-auto bg-white" v-else></div>
    </div>
  </div>

  <div class="me-M-30 ms-M-30 mb-M-44 block md:hidden">
    <p class="font-bebas-neue mb-M-40 text-M-50 leading-M-60">
      {{ $t("home.always_relevant.always") }}
      <br v-if="locale == 'cn'" />
      {{ $t("home.always_relevant.relevant") }}
    </p>

    <img
      class="h-M-305 ms-auto w-full object-cover"
      v-if="alwaysRelevantAsset && alwaysRelevantAsset.img_path"
      :src="getImg(alwaysRelevantAsset.img_path, 'slug-assets')"
    />
    <div class="mb-M-13 h-M-305 w-full bg-white" v-else></div>

    <p class="leading-M24 text-M-16">
      {{ getTextContentByLocale() }}
    </p>
  </div>
</template>
