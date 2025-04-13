<script setup lang="ts">
import type { Tag } from "~/types/catalog"

const tagsLine2: Tag[] = ["english", "russian", "chinese", "spanish", "french"]
const tagsLine3: Tag[] = ["chat", "markets", "forums", "top sellers", "essentials", "others"]

const store = await useInitializedCatalogItemsStore()
const { items } = storeToRefs(store)

const selectedTags = ref<Tag[]>(["chat"])

const itemsOracle = computed(() => items.value.filter((i) => JSON.parse(i.tags).includes("oracle")))
const itemsKozmap = computed(() => items.value.filter((i) => JSON.parse(i.tags).includes("kozmap")))

const itemForAllTiers = computed(() => {
  const selectedTagsWithKozmapAndOracle: Tag[] = [...selectedTags.value, "kozmap", "oracle"]
  return items.value.filter((i) => {
    const itemTags = JSON.parse(i.tags) as Tag[]
    for (const itemTag of itemTags) {
      if (selectedTagsWithKozmapAndOracle.includes(itemTag)) return true
    }
    return false
  })
})

const itemsTier1 = computed(() =>
  itemForAllTiers.value.filter((i) => {
    const itemReitingValue = i.reitings[0]?.value as number | undefined
    return itemReitingValue && itemReitingValue >= 75
  }),
)

const itemsTier2 = computed(() =>
  itemForAllTiers.value.filter((i) => {
    const itemReitingValue = i.reitings[0]?.value as number | undefined
    return itemReitingValue && itemReitingValue >= 50 && itemReitingValue < 75
  }),
)

const itemsTier3 = computed(() =>
  itemForAllTiers.value.filter((i) => {
    const itemReitingValue = i.reitings[0]?.value as number | undefined
    return itemReitingValue && itemReitingValue >= 25 && itemReitingValue < 50
  }),
)

const itemsTierLow = computed(() =>
  itemForAllTiers.value.filter((i) => {
    const itemReitingValue = i.reitings[0]?.value as number | undefined
    return !itemReitingValue || itemReitingValue < 25
  }),
)
</script>

<template>
  <div class="mb-M-20 md:mb-D-40">
    <CatalogMainTitle />
    <CatalogMainItemsBox isLarge :items="itemsOracle" :title="$t(`catalog.oracle.title`)" />
    <CatalogMainItemsBox isLarge :items="itemsKozmap" :title="$t(`catalog.kozmap.title`)" />
    <CatalogMainTagsLine v-model="selectedTags" :tags="tagsLine2" :title="$t('catalog.tags.line2Title')" />
    <CatalogMainTagsLine v-model="selectedTags" :tags="tagsLine3" :title="$t('catalog.tags.line3Title')" />
    <CatalogMainBanners />
    <CatalogMainItemsBox v-if="itemsTier1.length > 0" :items="itemsTier1" :title="$t(`catalog.tier.1`)" />
    <CatalogMainItemsBox v-if="itemsTier2.length > 0" :items="itemsTier2" :title="$t(`catalog.tier.2`)" />
    <CatalogMainItemsBox v-if="itemsTier3.length > 0" :items="itemsTier3" :title="$t(`catalog.tier.3`)" />
    <CatalogMainItemsBox
      v-if="itemsTierLow.length > 0"
      :items="itemsTierLow"
      :title="$t(`catalog.tier.low`)"
      color="red"
    />
  </div>
</template>
