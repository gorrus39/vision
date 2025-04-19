<script setup lang="ts">
import { type FullBriefJson, type FullCatalogItem, type Tag } from "~/types/catalog"

const tagsLine2: Tag[] = ["english", "russian", "chinese", "spanish", "french"]
const tagsLine3: Tag[] = ["chat", "markets", "forums", "top sellers", "essentials", "others"]

const store = await useInitializedCatalogItemsStore()
const { items } = storeToRefs(store)

const selectedTagLine2 = ref<Tag[]>([])
const selectedTagLine3 = ref<Tag[]>([])

const itemsOracle = computed(() => items.value.filter((i) => JSON.parse(i.tags).includes("oracle")))
const itemsKozmap = computed(() => items.value.filter((i) => JSON.parse(i.tags).includes("kozmap")))

const itemForTiers = computed(() => {
  // without kozmap & oracle

  // const selectedTagsWithKozmapAndOracle: Tag[] = [...selectedTagLine1.value, "kozmap", "oracle"]
  const tier1: FullCatalogItem[] = []
  const tier2: FullCatalogItem[] = []
  const tier3: FullCatalogItem[] = []
  const tierLow: FullCatalogItem[] = []

  if (selectedTagLine2.value.length === 0 || selectedTagLine3.value.length === 0)
    return { tier1, tier2, tier3, tierLow }

  const tagLine2 = selectedTagLine2.value[0]
  const tagLine3 = selectedTagLine3.value[0]

  for (const item of items.value) {
    const itemTags = JSON.parse(item.tags) as Tag[]

    if (!(itemTags.includes(tagLine2) && itemTags.includes(tagLine3))) continue

    const reiting = getBriefAgrigationValue({ items: (JSON.parse(item.brief) as FullBriefJson).items }).sumValue

    if (reiting == null) tierLow.push(item)
    else if (reiting < 25) tierLow.push(item)
    else if (reiting >= 25 && reiting < 50) tier3.push(item)
    else if (reiting >= 50 && reiting < 75) tier2.push(item)
    else if (reiting >= 75 && reiting < 100) tier1.push(item)
  }
  // debugger
  return { tier1, tier2, tier3, tierLow }
})
</script>

<template>
  <div class="mb-M-20 md:mb-D-40">
    <CatalogMainTitle />
    <CatalogMainItemsBox isLarge :items="itemsOracle" :title="$t(`catalog.oracle.title`)" />
    <CatalogMainItemsBox isLarge :items="itemsKozmap" :title="$t(`catalog.kozmap.title`)" />

    <CatalogMainTagsLine v-model="selectedTagLine2" :tags="tagsLine2" :title="$t('catalog.tags.line2Title')" />
    <CatalogMainTagsLine
      v-model="selectedTagLine3"
      v-if="selectedTagLine2.length > 0"
      :tags="tagsLine3"
      :title="$t('catalog.tags.line3Title')"
    />

    <CatalogMainBanners />

    <CatalogMainItemsBox
      v-if="itemForTiers.tier1.length > 0"
      :items="itemForTiers.tier1"
      :title="$t(`catalog.tier.1`)"
    />
    <CatalogMainItemsBox
      v-if="itemForTiers.tier2.length > 0"
      :items="itemForTiers.tier2"
      :title="$t(`catalog.tier.2`)"
    />
    <CatalogMainItemsBox
      v-if="itemForTiers.tier3.length > 0"
      :items="itemForTiers.tier3"
      :title="$t(`catalog.tier.3`)"
    />
    <CatalogMainItemsBox
      v-if="itemForTiers.tierLow.length > 0"
      :items="itemForTiers.tierLow"
      :title="$t(`catalog.tier.low`)"
      color="red"
    />
  </div>
</template>
