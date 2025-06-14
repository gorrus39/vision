<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui"
import _, { cloneDeep } from "lodash"
import { type BriefRow, type BriefJson } from "~/types/catalog"
import { isValidBrief } from "~/utils/all"
const { ui } = useAppConfig()

const modelJson = defineModel<BriefJson>({ required: true })
const emit = defineEmits(["updateError"])
const props = defineProps<{
  lastAgrigation: number | undefined | null
}>()

const showModal = ref(false)
const isValidBriefRef = ref(false)

const hasScoreChanges = ref(false)
const state = ref<BriefJson>(_.cloneDeep(modelJson.value))
const stateScore = computed(() => {
  return getBriefAgrigationValue({ items: state.value.items }).sumValue
})

const columns: TableColumn<BriefRow>[] = [
  { accessorKey: "category", header: "category", meta: { class: { td: "w-[200px]", th: "w-[200px]" } } },
  { accessorKey: "meaning", header: "meaning", meta: { class: { td: "h-4", th: "h-4" } } },
  { accessorKey: "score", header: "score" },
]

watch(state.value, () => {
  emit("updateError", null)

  const { error } = isValidBrief(state.value)
  if (error) isValidBriefRef.value = false
  else isValidBriefRef.value = true

  // briefAgrigationAfter.value = getBriefAgrigationValue({ items: state.value.items }).sumValue || 0
})

const handleSubmit = () => {
  showModal.value = false
  modelJson.value = cloneDeep(state.value)
}

const closeModal = () => {
  showModal.value = false
}

const initBriefAgrigationBefore = props.lastAgrigation //computed(() => modelJson.value.lastAgrigation.sumValue)
const initBriefAgrigationAfter = computed(() => getBriefAgrigationValue({ items: modelJson.value.items }).sumValue || 0)

watch(state.value, () => {
  if (hasScoreChanges!) {
    const scoreInit = getBriefAgrigationValue({ items: modelJson.value.items }).sumValue
    const scoreNow = getBriefAgrigationValue({ items: state.value.items }).sumValue
    if (scoreInit !== scoreNow) hasScoreChanges.value = true
  }
})
</script>

<template>
  <UModal v-model:open="showModal" @close="closeModal" title="brief" fullscreen>
    <UButton @click="showModal = true" icon="i-heroicons-pencil-square-20-solid" label="manage brief" />

    <template #body>
      <div class="p-4 text-black">
        <div class="flex items-center gap-2">
          <div class="flex gap-4 rounded p-1 ring-1 ring-gray-300">
            <span>
              reiting before: <b> {{ initBriefAgrigationBefore ?? "null" }} </b></span
            >
            <span>
              reiting after: <b>{{ initBriefAgrigationAfter }}</b>
            </span>
            <admin-chanks-arrow-svg :before="initBriefAgrigationBefore" :after="initBriefAgrigationAfter" />
          </div>
          <div class="flex gap-4 rounded p-1 ring-1 ring-gray-600" v-if="hasScoreChanges">
            <span>
              reiting before: <b> {{ initBriefAgrigationAfter }} </b></span
            >
            <span>
              reiting after: <b>{{ stateScore }}</b>
            </span>
            <admin-chanks-arrow-svg :before="initBriefAgrigationAfter" :after="stateScore!" />
          </div>
          <p class="ms-auto">fill every fields in any language</p>
        </div>

        <UTable :data="state.items" :columns>
          <template #category-cell="{ row }">
            <p>{{ row.original.category.toUpperCase() }}</p>
          </template>

          <template #meaning-cell="{ row }">
            <div class="flex w-full gap-2">
              <UFormField name="plug">
                <UTextarea
                  v-model="row.original.meaning.en"
                  :ui="{ base: 'h-12 flex-1' }"
                  size="sm"
                  placeholder="Enter meaning EN"
                />
              </UFormField>
              <UFormField name="plug">
                <UTextarea
                  v-model="row.original.meaning.ru"
                  :ui="{ base: 'h-12 flex-1' }"
                  size="sm"
                  placeholder="Enter meaning RU"
                />
              </UFormField>
              <UFormField name="plug">
                <UTextarea
                  v-model="row.original.meaning.cn"
                  :ui="{ base: 'h-12 flex-1' }"
                  size="sm"
                  placeholder="Enter meaning CN"
                />
              </UFormField>
            </div>
          </template>

          <template #score-cell="{ row }">
            <UFormField name="plug">
              <UInputNumber v-model="row.original.score" :min="0" :max="10" color="success" />
            </UFormField>
          </template>
        </UTable>
      </div>
    </template>

    <template #footer>
      <UButton :disabled="!isValidBriefRef" @click="handleSubmit" :icon="ui.iconsExt.submit" label="Complete" />
      <UButton :icon="ui.icons.close" @click="closeModal" color="error" variant="outline" label="Close" />
    </template>
  </UModal>
</template>
