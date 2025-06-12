<script setup lang="ts">
import type { Language } from "~/types/admin"
import type { Lang } from "~/types/catalog"
const languages: Language[] = useLanguages()
const props = defineProps<{
  disabled?: boolean
  isCompleteLang?: Set<Lang>
}>()
const items = computed(() =>
  languages.map((l) => {
    const disabled = props.disabled
    const label = props.isCompleteLang?.has(l.value) ? `${l.label} ✅` : l.label
    return { ...l, disabled, label }
  }),
)
const model = defineModel<Lang>({ required: true })
</script>

<template>
  <UTabs v-model="model" :items color="secondary" />
</template>
