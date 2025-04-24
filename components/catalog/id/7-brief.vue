<script setup lang="ts">
import type { BriefItemJson, FullBriefJson, FullCatalogItem, Lang } from "~/types/catalog"
const { t, locale } = useI18n()

const props = defineProps<{
  item: FullCatalogItem
}>()
const rows: BriefItemJson[] = (JSON.parse(props.item.brief) as FullBriefJson).items

const columns = [
  {
    key: "category",
    label: t("catalog.id.brief_category"),

    class: "",
  },
  { key: "meaning", label: t("catalog.id.brief_meaning"), class: "" },
  {
    key: "score",
    label: t("catalog.id.brief_score"),

    class: "",
  },
]

const getMeaningValue = (row: BriefItemJson) => {
  const valueByLocale = row.meaning[locale.value as Lang]

  if (valueByLocale && valueByLocale.length > 0) return valueByLocale

  // valueByFirstLang
  for (const value of Object.values(row.meaning)) {
    if (value && value.length > 0) return value
  }

  console.error("any value must present. brief.meaning field")
  return ""
}

const briefFielsAmount = (JSON.parse(props.item.brief) as FullBriefJson).items.length
</script>

<template>
  <div class="relative">
    <CatalogIdTitleBlock :text="$t('catalog.id.brief')" />

    <NuxtImg class="absolute top-[20vw] z-0 w-full md:top-[-1vw]" src="images/catalog/id/brief.png" />

    <UTable
      class="x-mx relative z-10 hidden mb-D-120 md:block"
      :columns="columns"
      :rows="rows"
      :ui="{
        base: 'table-fixed max-w-full border-D',
        devide: 'divide-white dark:divide-white',
        th: { color: 'text-white dark:text-white', base: 'font-secondary', size: 'text-D-45', padding: 'p-D-70' },
        td: {
          color: 'text-white dark:text-white',
          padding: 'p-D-70',
          size: 'text-D-26 leading-D-34',
          base: 'whitespace-normal',
        },
        thead: 'bg-black/90',
        tbody: 'bg-black/60',
      }"
    >
      <template #category-data="{ row }: { row: BriefItemJson }">
        <b> {{ $t(`catalog.id.brief_category_${row.category.replaceAll(" ", "_")}`) }}</b>
      </template>
      <template #meaning-data="{ row }: { row: BriefItemJson }">
        {{ getMeaningValue(row) }}
      </template>
      <template #score-data="{ row }: { row: BriefItemJson }"> {{ row.score }}/{{ briefFielsAmount }} </template>
    </UTable>

    <div class="x-mx relative z-10 flex flex-col gap-M-5 md:hidden">
      <CatalogIdBriefMobileField
        v-for="row in rows"
        :row="row"
        :meaningValue="getMeaningValue(row)"
        :briefFielsAmount="briefFielsAmount"
      />
    </div>
  </div>
</template>
