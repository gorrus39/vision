<script setup lang="ts">
import _ from "lodash"
import { fullBriefJsonEmpty, type BriefItemJson, type FullBriefJson, type Lang } from "~/types/catalog"
import { isValidBrief } from "~/utils/all"
// TODO:
// почему-то при edit isCompleteLang ожидаемые значения принимает, но в модалке с заполнением кнопка не всегда соответсвует. иногда дизейблится когда не должна. во вкладках с языками не всегда соответсвующий значёк отображается, который зависим от isCompleteLang
const briefString = defineModel<string>()
const showModal = ref(false)
const isValidBriefRef = ref(false)

const emit = defineEmits(["updateError"])

const init = (): FullBriefJson => {
  // заглушка, так как brief может быть undefined
  if (!briefString.value) return fullBriefJsonEmpty()

  const briefJson = JSON.parse(briefString.value) as FullBriefJson
  const isEdit = briefJson.lastAgrigation.sumValue !== null //

  if (isEdit) return briefJson
  else return fullBriefJsonEmpty()
}

const briefJson = ref<FullBriefJson>(init())

const columns = [
  { key: "category", label: "category", class: "w-[200px]" },
  { key: "meaning", label: "meaning", class: "   h-4" },
  { key: "score", label: "score", class: "w-[100px] h-4" },
]

watch(briefJson.value, () => {
  emit("updateError", null)

  const { error } = isValidBrief(briefJson.value)
  if (error) isValidBriefRef.value = false
  else isValidBriefRef.value = true

  briefAgrigationAfter.value = getBriefAgrigationValue({ items: briefJson.value.items }).sumValue || 0
})

const handleSubmit = () => {
  briefString.value = JSON.stringify(briefJson.value)
  showModal.value = false
}

const closeModal = () => {
  showModal.value = false
  briefJson.value = init()
}

const briefAgrigationAfter = ref<number>(getBriefAgrigationValue({ items: briefJson.value.items }).sumValue || 0)

const briefAgrigationBefore =
  briefString.value && (JSON.parse(briefString.value) as FullBriefJson).lastAgrigation.sumValue
</script>

<template>
  <div class="flex items-center gap-2">
    <span> brief </span>

    <UButton @click="showModal = true" icon="i-heroicons-pencil-square-20-solid" label="manage brief" />
  </div>

  <UModal class="text-black" v-model="showModal" :ui="{ width: 'w-screen lg:max-w-[80vw]' }" @close="closeModal">
    <div class="p-4">
      <div class="flex w-full items-center gap-2">
        <UButton
          class="h-min"
          :disabled="!isValidBriefRef"
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
        <p>
          reiting before: <b> {{ briefAgrigationBefore }}</b>
        </p>
        <p>
          reiting after: <b>{{ briefAgrigationAfter }}</b>
        </p>
        <svg
          v-if="briefJson.lastAgrigation.sumValue"
          :class="[(briefAgrigationBefore || 0) <= briefAgrigationAfter ? 'rotate-0' : 'rotate-180']"
          width="8"
          height="20"
          viewBox="0 0 8 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.35355 0.646447C4.15829 0.451184 3.84171 0.451184 3.64645 0.646447L0.464465 3.82843C0.269203 4.02369 0.269203 4.34027 0.464465 4.53553C0.659728 4.7308 0.97631 4.7308 1.17157 4.53553L4 1.70711L6.82843 4.53553C7.02369 4.7308 7.34027 4.7308 7.53553 4.53553C7.7308 4.34027 7.7308 4.02369 7.53553 3.82843L4.35355 0.646447ZM4.5 20L4.5 1L3.5 1L3.5 20L4.5 20Z"
            :fill="(briefAgrigationBefore || 0) <= briefAgrigationAfter ? '#18B700' : 'red'"
          />
        </svg>
      </div>
      <p class="text-center">fill every fields in any language</p>

      <UTable :rows="briefJson.items" :columns="columns">
        <template #category-data="{ row }: { row: BriefItemJson }">
          <p>{{ row.category.toUpperCase() }}</p>
        </template>

        <template #meaning-data="{ row, index }: { row: BriefItemJson; index: number }">
          <div class="flex w-full gap-2">
            <UTextarea
              v-model="row.meaning.en"
              :ui="{ base: 'h-12 flex-1' }"
              size="sm"
              placeholder="Enter meaning EN"
            />
            <UTextarea
              v-model="row.meaning.ru"
              :ui="{ base: 'h-12 flex-1' }"
              size="sm"
              placeholder="Enter meaning RU"
            />
            <UTextarea
              v-model="row.meaning.cn"
              :ui="{ base: 'h-12 flex-1' }"
              size="sm"
              placeholder="Enter meaning CN"
            />
          </div>
        </template>

        <template #score-data="{ row, index }: { row: BriefItemJson; index: number }">
          <div class="flex items-center gap-2">
            <UButton @click="row.score--" :disabled="row.score == 0" label="-" />
            <b>
              <span class="block w-3">{{ row.score }}</span></b
            >
            <UButton @click="row.score++" :disabled="row.score == 10" label="+" />
          </div>
          <!-- <UInput v-model="row.score" size="sm" placeholder="Enter score" /> -->
        </template>
      </UTable>
    </div>
  </UModal>
</template>
