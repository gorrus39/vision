<script setup lang="ts">
type Lang = "ru" | "en" | "cn";
const lang = ref<Lang>("en");
const descriptionShort = defineModel<string>();
const isCompleteLang = ref<Set<Lang>>(new Set());
const emit = defineEmits(["updateError"]);

const defaultValue = {
  ru: "",
  en: "",
  cn: "",
};
const init = (): { [key in "ru" | "en" | "cn"]: string } => {
  if (descriptionShort.value == undefined) return defaultValue;
  if (descriptionShort.value.length == 0) return defaultValue;

  return JSON.parse(descriptionShort.value);
};

const localModel = ref<{ [key in "ru" | "en" | "cn"]: string }>(init());

watch(localModel.value, () => {
  emit("updateError", null);

  for (const [lang, stringValue] of Object.entries(localModel.value)) {
    const langTyped = lang as Lang;

    const isFilled = stringValue.trim().length > 0;
    if (isFilled) isCompleteLang.value.add(langTyped);
    else isCompleteLang.value.delete(langTyped);
  }
  descriptionShort.value = JSON.stringify(localModel.value);
});
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <span>description short</span>
      <CatalogAdminPanelItemsLangTabs v-model="lang" :isCompleteLang="isCompleteLang" />
    </div>
    <UInput v-if="localModel" v-model="localModel[lang]" />
  </div>
</template>
