<script setup lang="ts">
import _ from "lodash";

type Lang = "ru" | "en" | "cn";
const lang = defineModel<Lang>();

const props = defineProps<{
  isCompleteLang: Set<Lang>;
}>();

type Tab = { label: string; icon: string; value: Lang };

const tabs: Tab[] = [
  {
    label: `English`,
    icon: "i-cif:us",
    value: "en",
  },
  {
    label: "Russian",
    icon: "i-cif:ru",
    value: "ru",
  },
  {
    label: "Chinese",
    icon: "i-cif:cn",
    value: "cn",
  },
];

const tabsRef: Ref<Tab[]> = ref([...tabs]);

function onChange(index: number) {
  const tab = tabsRef.value[index];

  lang.value = tab.value;
}

const defaultIndex = computed(() => {
  for (let i = 0; i < tabsRef.value.length - 1; i++) {
    if (tabsRef.value[i].value == lang.value) return i;
  }
  return 0;
});

watch(props.isCompleteLang, () => {
  tabsRef.value = _.cloneDeep(tabs).map((t) => {
    const hasMarker = props.isCompleteLang.has(t.value);

    // почему-то когда кликаем по оверлэй модалки и открываем, калочка пропадает...
    if (hasMarker) t.label = `${t.label} ✅`;
    return t;
  });
});
</script>

<template>
  <UTabs class="h-max w-[30vw]" :items="tabsRef" @change="onChange" :defaultIndex="defaultIndex" />
</template>
