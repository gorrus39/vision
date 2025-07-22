<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui"
import type { BriefCategory, BriefJson, BriefRow, FullCatalogItem, Lang } from "~/types/catalog"
const { t, locale } = useI18n()

const props = defineProps<{
  item: FullCatalogItem
}>()
const rows = props.item.brief.items

const columns: TableColumn<BriefRow>[] = [
  {
    accessorKey: "category",
    header: t("catalog.id.brief_category"),
  },
  { accessorKey: "meaning", header: t("catalog.id.brief_meaning") },
  {
    accessorKey: "score",
    header: t("catalog.id.brief_score"),
  },
]

const getMeaningValue = (row: BriefRow) => {
  const valueByLocale = row.meaning[locale.value as Lang]

  if (valueByLocale && valueByLocale.length > 0) return valueByLocale

  // valueByFirstLang
  for (const value of Object.values(row.meaning)) {
    if (value && value.length > 0) return value
  }

  console.error("any value must present. brief.meaning field")
  return ""
}

const briefFielsAmount = props.item.brief.items.length
</script>

<template>
  <div class="relative">
    <CatalogIdTitleBlock :text="$t('catalog.id.brief')" />

    <NuxtImg class="absolute top-[20vw] z-0 w-full md:top-[-1vw]" src="images/catalog/id/brief.png" />

    <UTable
      class="x-mx mb-D-120 relative z-10 hidden md:block"
      :columns="columns"
      :data="rows"
      :ui="{
        base: 'table-fixed max-w-full border-D',
        // separator: 'divide-white dark:divide-white',
        th: 'text-white dark:text-white font-secondary text-D-45 p-D-70',
        td: 'text-white dark:text-white p-D-70 text-D-26 leading-D-34 whitespace-normal',
        thead: 'bg-black/90',
        tbody: 'bg-black/60',
      }"
    >
      <template #category-cell="{ row }">
        <b> {{ $t(`catalog.id.brief_category_${row.original.category.replaceAll(" ", "_")}`) }}</b>
      </template>
      <template #meaning-cell="{ row }">
        {{ getMeaningValue(row.original) }}
      </template>
      <template #score-cell="{ row }"> {{ row.original.score }}/{{ briefFielsAmount }} </template>
    </UTable>

    <div class="x-mx gap-M-5 relative z-10 flex flex-col md:hidden">
      <CatalogIdBriefMobileField
        v-for="row in rows"
        :row="row"
        :meaningValue="getMeaningValue(row)"
        :briefFielsAmount="briefFielsAmount"
      />
    </div>
  </div>
</template>
