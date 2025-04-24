<script setup lang="ts">
import type { BriefItemJson } from "~/types/catalog"

const isExpand = ref(false)

defineProps<{
  row: BriefItemJson
  meaningValue: string
  briefFielsAmount: number
}>()
</script>

<template>
  <div class="border-M bg-black/60">
    <div class="grid grid-cols-[2vw_auto_2vw] items-center m-M-10" @click="isExpand = !isExpand">
      <span></span>
      <p class="text-center text-M-12">
        <b> {{ $t(`catalog.id.brief_category_${row.category.replaceAll(" ", "_")}`) }}</b>
      </p>
      <NuxtImg
        class="ms-auto h-auto w-M-20"
        :class="[isExpand ? 'rotate-180' : 'rotate-0']"
        src="/images/catalog/id/arrow.svg"
      />
    </div>

    <table class="w-full" v-if="isExpand">
      <thead class="bg-black/50">
        <tr class="border-M-b border-M-t font-secondary text-M-16">
          <td class="border-M-e w-auto p-M-15">{{ $t("catalog.id.brief_meaning") }}</td>
          <td class="p-M-15 w-M-84">{{ $t("catalog.id.brief_score") }}</td>
        </tr>
      </thead>

      <tbody>
        <tr class="border-M-b border-M-t text-M-12">
          <td class="border-M-e p-M-15">{{ meaningValue }}</td>
          <td class="p-M-15 w-M-84">{{ row.score }}/{{ briefFielsAmount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
