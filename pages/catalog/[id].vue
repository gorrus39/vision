<script setup lang="ts">
const store = useCatalogItemsStore()
await callOnce(async () => store.initData())

const items = store.data
const id = useRoute().params.id as string

const item = ref(items.find((i) => i.id == +id))

if (item.value == undefined)
  throw Error("don`t found catalog-item, when search item in catalog-item store by route.params.id")

const definedItem = item.value!
</script>

<template v-if="item">
  <CatalogId1Title />
  <CatalogId2Logo :item="definedItem" />
  <CatalogId3Links :item="definedItem" />
  <CatalogId4Rating :item="definedItem" />
  <CatalogId5Medals v-if="definedItem.catalog_reward_ids.length > 0" :item="definedItem" />
  <CatalogId6Description :item="definedItem" />
  <CatalogId7Brief :item="definedItem" />
  <CatalogId8Rules :item="definedItem" />
  <CatalogId9Admins :item="definedItem" />
</template>
