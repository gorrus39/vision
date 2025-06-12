<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from "@internationalized/date"

const model = defineModel<Date>({ required: true })

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
})
const dateNow = new Date()
const year = dateNow.getFullYear()
const month = dateNow.getMonth() + 1
const day = dateNow.getDate()

const modelValue = shallowRef(new CalendarDate(year, month, day))

const onChange = () => {
  model.value = modelValue.value.toDate("europe/moscow")
}
</script>

<template>
  <UPopover :ui="{ content: 'text-black' }">
    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
      {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : "Select a date" }}
    </UButton>

    <template #content>
      <UCalendar class="p-2" v-model="modelValue" @update:modelValue="onChange" />
    </template>
  </UPopover>
</template>
