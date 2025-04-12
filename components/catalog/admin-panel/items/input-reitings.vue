<script setup lang="ts">
import type { Reiting } from "~/types/catalog"

defineProps<{
  isLoading: boolean
}>()

const isValid = (value: string | null | undefined) => {
  if (value == null || value == undefined || value == "") return false
  const number = +value
  if (number > 0 && number <= 100) return true
  else return false
}
const reitings = defineModel<Reiting[]>()

const inputValue = ref(undefined)

const addValue = () => {
  const value = inputValue.value

  if (!value) return
  if (+value === 0) return
  if (isNaN(+value)) return
  if (!reitings.value) return

  reitings.value.push({ value: +value })
  reitings.value.unshift({ value: +value })

  inputValue.value = undefined // очистка поля
}
</script>

<template>
  <div class="flex items-center gap-2">
    <UInput v-model="inputValue" />
    <UButton @click="addValue" :disabled="!isValid(inputValue) || isLoading" icon="i-ep:circle-plus-filled" square />
    <p v-if="reitings" v-html="viewLast3Reitings(reitings)" />
  </div>
</template>
