<script setup lang="ts">
const store = await useInitializedCatalogItemsStore()
const { items } = storeToRefs(store)
const id = useRoute().params.id as string

const item = ref(items.value.find((i) => i.id == +id))

if (item.value == undefined)
  throw Error("don`t found catalog-item, when search item in catalog-item store by route.params.id")

const definedItem = item.value!
</script>

<template v-if="item">
  <CatalogId1Title />
  <CatalogId2Logo :item="definedItem" />
  <CatalogId3Links :item="definedItem" />
</template>
