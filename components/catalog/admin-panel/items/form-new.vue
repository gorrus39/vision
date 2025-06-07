<script setup lang="ts">
import _ from "lodash"
import { fullBriefJsonEmpty, fullCatalogItemSchema, type FullCatalogItem } from "~/types/catalog"
import { isValidBrief } from "~/utils/all"
const store = await useInitializedCatalogItemsStore()
const { create_or_update_item_remote } = store
const toast = useToast()
const isLoading = ref(false)
const briefError = ref<null | string>(null)
const descriptionShortError = ref<null | string>(null)

const showForm = defineModel<boolean>()

const emptyItem: FullCatalogItem = {
  title: "",
  rewards: [],
  admins: [],
  tags: "[]",
  links: [],
  brief: JSON.stringify(fullBriefJsonEmpty()),
  description_short: "",
  // JSON.stringify({
  //   ru: "test",
  //   en: "test",
  //   cn: "test",
  // }),
  description_large: "",
  rules: "",
  img_short_path: "",
  img_large_path: "",

  is_top: false,
}

const state = ref<FullCatalogItem>(emptyItem)

const invalidDescriptionShort = () => {
  const errors: Record<string, string> = {}
  let json: any

  try {
    json = JSON.parse(state.value.description_short)
  } catch (err) {
    errors.brief = "Description short must be valid JSON"
  }

  const jsonDescriptionShort = json as {
    ru: string
    en: string
    cn: string
  }

  const isAnyValuePresent = Object.values(jsonDescriptionShort).some((v) => v.trim().length > 0)

  if (!isAnyValuePresent) {
    errors.description_short = "required any value"
  }

  // Если есть ошибки, устанавливаем их в форму
  if (Object.keys(errors).length > 0) {
    descriptionShortError.value = errors.description_short
    return true // Возвращаем true, если ошибки есть
  }

  return false // Нет ошибок
}

const handleSubmit = async () => {
  const { error: briefErrorString } = isValidBrief(state.value.brief)
  if (briefErrorString) {
    briefError.value = briefErrorString
    return
  }

  if (invalidDescriptionShort()) {
    console.error("invalidDescriptionShort()")
    return
  }

  isLoading.value = true
  const { error, success } = await create_or_update_item_remote(state.value)
  if (success) {
    toast.add({ title: "success" })
  } else {
    toast.add({ title: error as string, color: "red" })
  }
  state.value = emptyItem
  showForm.value = false
  isLoading.value = false
}
</script>
<template>
  <UModal v-model="showForm" fullscreen :ui="{ fullscreen: 'h-auto min-h-screen' }">
    <div class="space-y-2 p-2 text-black">
      <UForm
        class="space-y-2"
        v-slot="{ errors }"
        @submit.prevent="handleSubmit"
        :state="state"
        :schema="fullCatalogItemSchema"
      >
        <div class="space-x-2">
          <h2>Add item</h2>

          <UButton type="submit" icon="i-ep:circle-plus-filled" label="Create" :loading="isLoading" />

          <UButton
            icon="i-heroicons:x-mark-20-solid"
            @click="showForm = false"
            color="red"
            variant="outline"
            :disabled="isLoading"
            label="Close"
          />
        </div>
        <hr />

        <UFormGroup name="is_top" label="is TOP PROJECT?" :ui="{ wrapper: 'flex gap-2 items-center' }">
          <UToggle
            v-model="state.is_top"
            name="is_top"
            on-icon="i-heroicons-check-20-solid"
            off-icon="i-heroicons-x-mark-20-solid"
          />
        </UFormGroup>

        <hr />

        <div class="flex gap-2">
          <UFormGroup name="img_short_path" label="img-short" required>
            <ChanksInputPhotoCatalogItem v-model="state" photoShort />
          </UFormGroup>

          <UFormGroup name="img_large_path" label="img-large" required>
            <ChanksInputPhotoCatalogItem v-model="state" />
          </UFormGroup>
        </div>

        <hr />
        <UFormGroup name="title" label="title" required>
          <UInput v-model="state.title" :autofocus="false" />
        </UFormGroup>

        <hr />

        <div class="flex gap-2">
          <UFormGroup name="rewards" label="rewards">
            <CatalogAdminPanelItemsInputRewards v-model="state.rewards" />
          </UFormGroup>

          <UFormGroup name="admins" label="admins">
            <CatalogAdminPanelItemsInputAdmins v-model="state.admins" />
          </UFormGroup>
        </div>
        <hr />

        <UFormGroup name="tags" label="tags">
          <CatalogAdminPanelItemsInputTags v-model="state.tags" />
        </UFormGroup>
        <hr />

        <UFormGroup name="links">
          <CatalogAdminPanelItemsInputLinks v-model="state.links" />
        </UFormGroup>
        <hr />

        <!-- <UFormGroup name="reitings" label="reitings">
          <CatalogAdminPanelItemsInputReitings v-model="state.reitings" :isLoading="isLoading" />
        </UFormGroup>
        <hr /> -->

        <UFormGroup name="brief" required>
          <CatalogAdminPanelItemsInputBrief v-model="state.brief" @updateError="briefError = $event" />
          <p class="text-red-500" v-if="briefError">{{ briefError }}</p>
        </UFormGroup>
        <hr />

        <UFormGroup name="description_short">
          <CatalogAdminPanelItemsInputDescriptionShord
            v-model="state.description_short"
            @updateError="descriptionShortError = $event"
          />

          <p class="text-red-500" v-if="descriptionShortError">{{ descriptionShortError }}</p>
        </UFormGroup>
        <hr />

        <UFormGroup name="description_large" label="description_large" required>
          <ChanksTextEditorCatalogItemField v-model="state.description_large" />
        </UFormGroup>
        <hr />

        <UFormGroup name="rules" label="rules" required>
          <ChanksTextEditorCatalogItemField v-model="state.rules" />
        </UFormGroup>
      </UForm>
    </div>
  </UModal>
</template>
