<script setup lang="ts">
import type { Language } from "~/types/admin"
import type { Lang } from "~/types/catalog"
const languages: Language[] = useLanguages()

const props = defineProps<{ disabled?: boolean }>()
const items = computed(() => languages.map((l) => ({ ...l, disabled: props.disabled })))
const model = defineModel<Lang>({ required: true })
</script>

<template>
  <UTabs class="flex-row" v-model="model" :items color="secondary" />
</template>
