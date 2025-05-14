<script setup lang="ts">
import type { Lang } from "~/types/catalog"
import type { FullFaqItem } from "~/types/faq"
import draggable from "vuedraggable"

const store = useFaqStore()
await callOnce("faq-items", () => store.initData())

const columns = [
  { name: "Act", width: "50px" },
  { name: "ID", width: "50px" },
  { name: "Priority", width: "100px" },
  { name: "Title", width: "100px" },
  { name: "Category", width: "100px" },
  { name: "Image(s)", width: "80px" },
  { name: "Sub Title", width: "100px" },
  { name: "Text", width: "auto" },
]

type TabLangLocal = { label: Lang }
const tabsLangLocal: TabLangLocal[] = [{ label: "en" }, { label: "cn" }, { label: "ru" }]
const langLocal = ref<TabLangLocal>(tabsLangLocal[0])
const changeLangLocal = (index: number) => (langLocal.value = tabsLangLocal[index])

const handleClickEditItem = (item: FullFaqItem) => {}
</script>

<template>
  <u-tabs :ui="{ wrapper: 'w-52' }" :items="tabsLangLocal" @change="changeLangLocal" />

  <div class="max-w-[100vw] overflow-hidden rounded-lg border border-gray-300 text-black shadow-md">
    <div
      class="grid items-center gap-4 bg-gray-200 p-1 text-sm font-bold"
      :style="{
        gridTemplateColumns: columns.map((c) => c.width).join(' '),
      }"
    >
      <div v-for="col in columns">{{ col.name }}</div>
    </div>

    <div class="max-h-[80vh] overflow-auto">
      <draggable v-model="store.data" item-key="id" @end="store.updateItemsOrder">
        <template #item="{ element: item, index }: { element: FullFaqItem; index: number }">
          <div
            class="grid items-center gap-4 p-1 font-medium text-black"
            :class="[index % 2 === 0 ? 'bg-white' : 'bg-gray-50', { hidden: item.lang !== langLocal.label }]"
            :style="{
              gridTemplateColumns: columns.map((c) => c.width).join(' '),
            }"
          >
            <div class="flex justify-evenly">
              <faq-admin-table-action-delete v-if="item.id" :id="item.id" />
              <faq-admin-table-action-edit :item />
            </div>

            <div class="p-1">
              {{ item.id }}
            </div>

            <div class="p-1">
              {{ item.priority == "High" ? `🔥 ${item.priority}` : item.priority }}
            </div>

            <div class="p-1">{{ item.title }}</div>

            <div class="p-1">{{ item.category }}</div>

            <div class="flex items-center justify-center px-2 py-2">
              <span class="font-bold text-green-600" v-if="item.images.length > 0">✔</span>
              <span class="font-bold text-red-600" v-else>✘</span>
            </div>

            <div class="p-1">{{ item.sub_title }}</div>

            <div class="relative truncate p-1">
              <span
                class="block overflow-hidden text-ellipsis whitespace-nowrap"
                style="
                  mask-image: linear-gradient(to right, black 80%, transparent);
                  -webkit-mask-image: linear-gradient(to right, black 80%, transparent);
                "
              >
                {{ item.text }}
              </span>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
