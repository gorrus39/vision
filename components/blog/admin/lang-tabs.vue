<script setup lang="ts">
import { get_all_items_by_lang } from "~/server/utils/helpers/blog";

const store = useInitializedBlogStore();
const { items_admin } = storeToRefs(store);

const adminLang = defineModel();

const items_by_lang = computed(() => {
  return;
});
const ru = ref<"ru">("ru");
const en = ref<"en">("en");
const cn = ref<"cn">("cn");

const initValues = () => [
  {
    label: `${get_all_items_by_lang(items_admin, ru).length} Russian`,
    icon: "i-cif:ru",
    value: "ru",
  },
  {
    label: `${get_all_items_by_lang(items_admin, cn).length} Chinese`,
    icon: "i-cif:cn",
    value: "cn",
  },
  {
    label: `${get_all_items_by_lang(items_admin, en).length} English`,
    icon: "i-cif:us",
    value: "en",
  },
];

const items = ref(initValues());

function onChange(index: number) {
  const item = items.value[index];

  adminLang.value = item.value;
}

const defaultIndex = computed(() => {
  for (let i = 0; i < items.value.length; i++) {
    if (items.value[i].value === adminLang.value) return i;
  }
  return 0;
});

watch(items_admin.value, () => {
  items.value = initValues();
});
</script>

<template>
  <UTabs class="h-max w-[30vw]" :items="items" @change="onChange" :defaultIndex="defaultIndex" />
</template>
