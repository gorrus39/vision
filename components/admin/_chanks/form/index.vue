<script setup lang="ts">
import type { Lang } from "~/types/catalog"
// import { fullFaqItemSchema, type FullFaqItem } from "~/types/faq"
import { inject } from "vue"
import type { FormEntries, FormItem, StoreType } from "~/types/admin"
import { useCurrentStore } from "~/composables/currentStore"
import { UFormField, UPopover } from "#components"
import { cloneDeep } from "lodash"

const props = defineProps<{
  itemId: number | null
  lang?: Lang
}>()

const emit = defineEmits(["close-form"])

const loading = ref(false)
const toast = useToast()

const priorityOptions: ("High" | "Low")[] = ["High", "Low"]

const formEntries = inject<FormEntries<FormItem>>("formEntries")
const storeType = inject<StoreType>("storeType")
const currentStore = useCurrentStore(storeType)
if (!currentStore) throw new Error("!currentStore")

const state = ref<FormItem | null>(null)

if (formEntries && currentStore) {
  if (props.itemId) {
    const item = currentStore.data.find((i) => i.id === props.itemId)
    if (item) {
      state.value = cloneDeep(item)
    }
  } else {
    if ("lang" in formEntries.emptyItem) {
      state.value = cloneDeep({ ...formEntries.emptyItem, lang: formEntries.lang.value })
    } else {
      state.value = cloneDeep(formEntries.emptyItem)
    }
  }
} else console.error("!(formEntries && currentStore)")

const submit = async () => {
  if (!formEntries || !("handleSubmit" in formEntries)) return

  loading.value = true

  const fullState = state as Ref<FormItem>

  const { error } = await formEntries.handleSubmit(fullState)

  loading.value = false
  closeForm()

  if (error) toast.add({ title: error as string, color: "error" })
  else toast.add({ title: "successfully!" })
}

const closeForm = () => emit("close-form")
const languages = useLanguages()
</script>

<template>
  <UForm
    class="flex flex-col gap-4 overflow-auto p-2 text-black"
    v-if="state"
    :state
    :schema="formEntries?.schema"
    @submit="submit"
  >
    <div class="flex gap-2">
      <UFormField v-if="'title' in state" name="title">
        <admin-chanks-form-input v-model="state.title" placeholder="Title" />
      </UFormField>

      <UFormField v-if="'sub_title' in state" name="sub_title">
        <admin-chanks-form-input v-model="state.sub_title" placeholder="Sub title" />
      </UFormField>

      <UFormField v-if="'category' in state" name="category">
        <admin-chanks-form-input v-model="state.category" placeholder="Category" />
      </UFormField>
    </div>

    <UFormField v-if="'name' in state" name="name">
      <admin-chanks-form-input v-model="state.name" placeholder="name" />
    </UFormField>

    <UFormField v-if="'link' in state" name="link">
      <admin-chanks-form-input v-model="state.link" placeholder="link" />
    </UFormField>

    <UFormField v-if="'description' in state" name="description">
      <admin-chanks-form-textarea v-model="state.description" placeholder="description" />
    </UFormField>

    <UFormField v-if="'published_at' in state" name="published_at">
      <admin-chanks-form-date-picker v-model="state.published_at as Date" />
    </UFormField>

    <ClientOnly>
      <UFormField v-if="'text' in state" required label="text" name="text">
        <ChanksTextEditor v-model="state.text" />
      </UFormField>
    </ClientOnly>

    <div class="flex gap-2">
      <UFormField v-if="'priority' in state" required label="priority" name="priority">
        <USelect v-model="state.priority" :items="priorityOptions" :ui="{ base: 'w-24' }" />
      </UFormField>

      <UFormField v-if="'lang' in state" required label="language" name="lang">
        <USelect
          v-model="state.lang"
          :icon="languages.find((l) => state && 'lang' in state && l.value === state.lang)?.icon"
          :items="languages"
          :ui="{ base: 'w-36' }"
        />
      </UFormField>
    </div>
    <!-- ////////////////////////////////////////////// -->
    <admin-chanks-form-input-images
      v-if="'images' in state"
      v-model="state.images"
      refer_type="faq"
      :max-amount="formEntries?.images?.maxAmount"
    />

    <div class="flex gap-4">
      <UButton :loading type="submit">{{ itemId ? "Update" : "Create" }}</UButton>
      <UButton variant="outline" color="error" size="sm" @click="closeForm">Close form</UButton>
    </div>
  </UForm>
</template>
