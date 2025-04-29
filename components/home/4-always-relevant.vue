<script setup lang="ts">
const { locale } = useI18n()

const store = useSlugAssetsStore()

const alwaysRelevantAsset = computed(() => store.alwaysRelevantAsset)
const modal = useModal()

import HomeAdminModalAlwaysRelevant from "~/components/home/admin/modal-always-relevant.vue"
import type { Lang } from "~/types/catalog"
const openAdminModal = () => {
  modal.open(HomeAdminModalAlwaysRelevant, {
    slugAsset: alwaysRelevantAsset.value,
  })
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
  <div class="x-mx m-2 hidden md:flex">
    <UButton @click="openAdminModal" icon="i-lucide:settings" label="always relevant" />
  </div>

  <div class="hidden mb-D-80 ms-D-168 me-D-182 md:block">
    <div class="flex items-center gap-D-50">
      <p :class="['font-bebas-neue', locale == 'cn' ? 'w-[120vw] text-D-200' : 'text-D-250']">
        {{ $t("home.always_relevant.relevant") }}
      </p>
      <p class="text-D-24 leading-D-36">
        {{ getTextContentByLocale() }}
      </p>
    </div>

    <div :class="['relative flex', { 'h-[38vw]': locale == 'cn' }]">
      <div
        :class="[
          'absolute w-max -rotate-90 leading-D-200',

          locale == 'cn' ? 'left-D--290 top-D-280' : 'left-D--185 top-D-120',
        ]"
      >
        <p :class="['font-bebas-neue text-right', locale == 'cn' ? 'text-D-200' : 'text-D-250']">
          {{ $t("home.always_relevant.always") }}
        </p>
        <UDivider size="xl" />
      </div>
      <img
        class="relative top-1/2 ms-auto object-cover h-D-493 w-D-1285"
        v-if="alwaysRelevantAsset && alwaysRelevantAsset.img_path"
        :class="[{ '-translate-y-1/2': locale == 'cn' }]"
        :src="getImg(alwaysRelevantAsset.img_path, 'slug-assets')"
      />
      <div class="ms-auto bg-white h-D-493 w-D-1285" v-else></div>
    </div>
  </div>

  <div class="block me-M-30 ms-M-30 mb-M-44 md:hidden">
    <p class="font-bebas-neue mb-M-40 text-M-50 leading-M-60">
      {{ $t("home.always_relevant.always") }}
      <br v-if="locale == 'cn'" />
      {{ $t("home.always_relevant.relevant") }}
    </p>

    <img
      class="ms-auto w-full object-cover h-M-305"
      v-if="alwaysRelevantAsset && alwaysRelevantAsset.img_path"
      :src="getImg(alwaysRelevantAsset.img_path, 'slug-assets')"
    />
    <div class="w-full bg-white mb-M-13 h-M-305" v-else></div>

    <p class="leading-M24 text-M-16">
      {{ getTextContentByLocale() }}
    </p>
  </div>
</template>
