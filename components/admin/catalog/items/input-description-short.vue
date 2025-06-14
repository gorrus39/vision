<script setup lang="ts">
type Lang = "ru" | "en" | "cn"
const lang = ref<Lang>("en")
const descriptionShort = defineModel<string>({ required: true })
const isCompleteLang = computed<Set<Lang>>(() => {
  const set: Set<Lang> = new Set()
  for (const [lang, stringValue] of Object.entries(localModel.value)) {
    const langTyped = lang as Lang

    const isFilled = stringValue.trim().length > 0
    if (isFilled) set.add(langTyped)
    else set.delete(langTyped)
  }
  return set
  // const json = JSON.parse(descriptionShort.value) as
}) //ref<Set<Lang>>(new Set())
const emit = defineEmits(["updateError"])

const defaultValue = {
  ru: "",
  en: "",
  cn: "",
}
const init = (): { [key in "ru" | "en" | "cn"]: string } => {
  if (descriptionShort.value == undefined) return defaultValue
  if (descriptionShort.value.length == 0) return defaultValue

  return JSON.parse(descriptionShort.value)
}

const localModel = ref<{ [key in "ru" | "en" | "cn"]: string }>(init())

watch(localModel.value, () => {
  emit("updateError", null)

  descriptionShort.value = JSON.stringify(localModel.value)
})
</script>

<template>
  <div>
    <div class="flex gap-2">
      <admin-chanks-form-input v-model="localModel[lang]" placeholder="description short" />
      <admin-chanks-tabs-lang v-model="lang" :isCompleteLang />
    </div>
  </div>
</template>
