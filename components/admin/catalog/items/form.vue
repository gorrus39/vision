<script setup lang="ts">
const { ui } = useAppConfig()
import _ from "lodash"
import {
  fullCatalogItemSchema as schema,
  type CatalogAdmin,
  type CatalogReward,
  type FullCatalogItem,
} from "~/types/catalog"

const form = useTemplateRef("form")

const store = await useInitializedCatalogItemsStore()
// const { items } = storeToRefs(store)
const { create_or_update_item_remote } = store
const toast = useToast()
const isLoading = ref(false)
const briefError = ref<null | string>(null)
const descriptionShortError = ref<null | string>(null)

const props = defineProps<{
  item?: FullCatalogItem
}>()

const [showForm, modificator] = defineModel<boolean>("showForm", { required: true })

const initItem = (): FullCatalogItem => {
  if (props.item) {
    return _.cloneDeep(props.item)
  } else {
    const blank: FullCatalogItem = {
      title: "",
      tags: "",
      img_short_path: null,
      img_large_path: null,
      description_short: "",
      description_large: "",
      rules: "",
      brief: "",
      is_top: false,
      links: [],
      admins: [],
      rewards: [],
    }

    return blank
  }
}

const state = ref<FullCatalogItem>(initItem())

const invalidDescriptionShort = () => {
  if (!state.value) return

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
  if (state.value === undefined) return
  if (invalidDescriptionShort()) return

  isLoading.value = true
  const { error, success } = await create_or_update_item_remote(state.value)
  if (success) {
    toast.add({ title: "success" })
  } else {
    toast.add({ title: error as string, color: "error" })
  }
  showForm.value = false
  isLoading.value = false
}

const handleChangeRewards = (value: CatalogReward[]) => {
  console.log(value)
}
const handleChangeAdmins = (value: CatalogAdmin[]) => {
  console.log(value)
}

const isEdit = "edit" in modificator
</script>
<template>
  <USlideover v-model:open="showForm" :title="isEdit ? `Edit item id: ${item?.id}` : 'New item'">
    <template #body>
      <UForm ref="form" @submit="handleSubmit" :state :schema>
        <div class="space-y-2 text-black">
          <div class="flex gap-2">
            <UFormField name="img_short_path" label="img-short" required>
              <ChanksInputPhotoCatalogItem v-model="state" photoShort />
            </UFormField>

            <UFormField name="img_large_path" label="img-large" required>
              <ChanksInputPhotoCatalogItem v-model="state" />
            </UFormField>
          </div>

          <hr />

          <UFormField name="is_top">
            <USwitch v-model="state.is_top" label="is TOP PROJECT?" :ui="{ base: 'cursor-pointer' }" />
          </UFormField>

          <hr />

          <UFormField name="title">
            <admin-chanks-form-input v-model="state.title" placeholder="title" />
          </UFormField>

          <hr />

          <div class="flex gap-2">
            <UFormField name="rewards" label="rewards">
              <admin-catalog-items-input-rewards :rewards="state.rewards" @change="handleChangeRewards" />
            </UFormField>

            <UFormField name="admins" label="admins">
              <admin-catalog-items-input-admins :admins="state.admins" @change="handleChangeAdmins" />
            </UFormField>
          </div>

          <hr />

          <UFormField name="links">
            <admin-catalog-items-input-links v-model="state.links" />
          </UFormField>

          <hr />

          <UFormField name="tags" label="tags">
            <admin-catalog-items-input-tags v-model="state.tags" />
          </UFormField>

          <hr />

          <UFormField name="brief">
            <admin-catalog-items-input-brief v-model="state.brief" @updateError="briefError = $event" />
            <p class="text-red-500" v-if="briefError">{{ briefError }}</p>
          </UFormField>

          <hr />

          <UFormField name="description_short">
            <admin-catalog-items-input-description-short
              v-model="state.description_short"
              @updateError="descriptionShortError = $event"
            />
            <p class="text-red-500" v-if="descriptionShortError">{{ descriptionShortError }}</p>
          </UFormField>

          <hr />

          <UFormField name="description_large">
            <admin-chanks-form-textarea v-model="state.description_large" placeholder="description_large" />
          </UFormField>

          <hr />

          <UFormField name="rules" label="rules" required>
            <admin-chanks-form-text-editor v-model="state.rules" />
          </UFormField>
        </div>
      </UForm>
    </template>

    <template #footer>
      <div class="space-x-2">
        <UButton
          @click="form?.submit()"
          :icon="ui.iconsExt.submit"
          :label="isEdit ? 'Update' : 'Create'"
          :loading="isLoading"
        />
        <UButton
          :icon="ui.icons.close"
          @click="showForm = false"
          color="error"
          variant="outline"
          :disabled="isLoading"
          label="Close"
        />
      </div>
    </template>
  </USlideover>
</template>
