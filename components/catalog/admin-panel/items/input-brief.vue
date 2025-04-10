<script setup lang="ts">
import _ from "lodash";
import { emptyBriefString, type BriefItemJson } from "~/types/catalog";
// TODO:
// почему-то при edit isCompleteLang ожидаемые значения принимает, но в модалке с заполнением кнопка не всегда соответсвует. иногда дизейблится когда не должна. во вкладках с языками не всегда соответсвующий значёк отображается, который зависим от isCompleteLang
const brief = defineModel<string>();
const showModal = ref(false);
type Lang = "ru" | "en" | "cn";
const lang = ref<Lang>("en");
const isCompleteLangInBrief = ref<Set<Lang>>(new Set());

const emit = defineEmits(["updateError"]);

const init = (): { ru: BriefItemJson[]; en: BriefItemJson[]; cn: BriefItemJson[] } => {
  if (brief.value == undefined) {
    console.error("JSON.parse(emptyBriefString)");
    return JSON.parse(emptyBriefString);
  }

  const json = JSON.parse(brief.value);
  const ru = json["ru"];
  const en = json["en"];
  const cn = json["cn"];
  const arrs = [ru, en, cn];

  for (const lg of arrs) {
    for (const item of lg) {
      if (item.meaning == "undefined") item.meaning = undefined;
      if (item.score == "undefined") item.score = undefined;
    }
  }
  return { ru, en, cn };
};

const json = ref<{
  ru: BriefItemJson[];
  en: BriefItemJson[];
  cn: BriefItemJson[];
}>(init());

const columns = [
  { key: "category", label: "category" },
  { key: "meaning", label: "meaning", class: "w-64 h-4" },
  { key: "score", label: "score", class: "w-64 h-4" },
];

watch(json.value, () => {
  emit("updateError", null);
  console.log("asdf");
  for (const [lang, arrItems] of Object.entries(json.value)) {
    const langTyped = lang as Lang;

    const isFilled = arrItems.every(({ meaning, score }) => {
      return meaning !== undefined && score !== undefined && meaning?.length > 0 && score.length > 0;
    });
    if (isFilled) isCompleteLangInBrief.value.add(langTyped);
    else isCompleteLangInBrief.value.delete(langTyped);
  }
});

const handleSubmit = () => {
  brief.value = JSON.stringify(json.value);
  showModal.value = false;
};

const closeModal = () => {
  showModal.value = false;
  json.value = init();
};
</script>

<template>
  <div class="flex items-center gap-2">
    <span> brief </span>

    <UButton @click="showModal = true" icon="i-heroicons-pencil-square-20-solid" label="manage brief" />
  </div>

  <UModal class="text-black" v-model="showModal" :ui="{ width: 'w-screen lg:max-w-[80vw]' }" @close="closeModal">
    <div class="p-4">
      <div class="flex w-full gap-2">
        <UButton
          class="h-min"
          :disabled="!(isCompleteLangInBrief.size > 0)"
          @click="handleSubmit"
          icon="i-ep:circle-plus-filled"
          label="Complete"
        />

        <UButton
          class="h-min"
          icon="i-heroicons:x-mark-20-solid"
          @click="closeModal"
          color="red"
          variant="outline"
          label="Close"
        />

        <CatalogAdminPanelItemsLangTabs class="ms-auto" v-model="lang" :isCompleteLang="isCompleteLangInBrief" />
      </div>
      <p class="text-center">fill every fields in any language</p>

      <UTable :rows="json[lang]" :columns="columns">
        <template #category-data="{ row }: { row: BriefItemJson }">
          <p>{{ row.category }}</p>
        </template>

        <template #meaning-data="{ row, index }: { row: BriefItemJson; index: number }">
          <UTextarea
            v-model="json[lang][index].meaning"
            :ui="{ base: 'h-12 w-full', wrapper: 'w-[30vw]' }"
            size="sm"
            placeholder="Enter meaning"
          />
        </template>

        <template #score-data="{ row, index }: { row: BriefItemJson; index: number }">
          <UInput v-model="json[lang][index].score" size="sm" placeholder="Enter score" />
        </template>
      </UTable>
    </div>
  </UModal>
</template>
