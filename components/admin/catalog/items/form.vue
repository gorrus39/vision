<script setup lang="ts">
const { ui } = useAppConfig()
import _ from "lodash"
import {
  fullBriefJsonEmpty,
  fullCatalogItemSchema as schema,
  type CatalogAdmin,
  type CatalogReward,
  type FullCatalogItem,
} from "~/types/catalog"
import type { Image } from "~/types/common"

const form = useTemplateRef("form")

const store = useCatalogItemsStore()
await store.initData()
const { data } = storeToRefs(store)

const toast = useToast()
const isLoading = ref(false)
const descriptionShortError = ref<null | string>(null)

const props = defineProps<{
  id?: number | undefined
}>()

const [showForm, modificator] = defineModel<boolean>("showForm", { required: true })

const blank: FullCatalogItem = {
  title: "",
  tags: ["kozmap", "oracle"],
  description_short: "",
  description_large: "",
  rules: "",
  is_top: false,
  links: [],
  brief: fullBriefJsonEmpty(),
  catalog_admin_ids: [],
  catalog_reward_ids: [],
  images: [],
}
const initItem = (): FullCatalogItem => {
  if (props.id) {
    const item = data.value.find((i) => i.id === props.id)
    if (item) return _.cloneDeep({ ...item })
    else return _.cloneDeep(blank)
  } else {
    return _.cloneDeep(blank)
  }
}

const state = ref<FullCatalogItem>(initItem())
const handleSubmit = async () => {
  isLoading.value = true

  const formData = new FormData()

  for (let i = 0; i < state.value.images.length; i++) {
    const imageJson: Image = state.value.images[i]
    if (!imageJson.frontendFile) continue

    formData.set(`photo__index_${i}`, imageJson.frontendFile)
    delete state.value.images[i].frontendFile
  }

  formData.set("catalogItemJson", JSON.stringify(state.value))

  let error = undefined
  const id = state.value.id
  if (id) {
    error = (await store.updateItem(formData, id)).error
  } else {
    error = (await store.createItem(formData)).error
  }

  if (!error) {
    toast.add({ title: "success" })
  } else {
    toast.add({ title: error as string, color: "error" })
  }

  showForm.value = false
  isLoading.value = false
}

const handleChangeRewards = (reward_ids: number[]) => {
  state.value.catalog_reward_ids = reward_ids
}
const handleChangeAdmins = (admin_ids: number[]) => {
  state.value.catalog_admin_ids = admin_ids
}

const isEdit = "edit" in modificator
</script>
<template>
  <USlideover v-model:open="showForm" :title="isEdit ? `Edit item id: ${id}` : 'New item'">
    <template #body>
      <UForm ref="form" @submit="handleSubmit" :state :schema>
        <div class="space-y-2 text-black">
          <div class="flex gap-2">
            <UFormField name="images">
              <admin-chanks-form-input-images v-model="state.images" :max-amount="2" refer_type="catalog-item" />
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
              <admin-catalog-items-input-rewards :reward_ids="state.catalog_reward_ids" @change="handleChangeRewards" />
            </UFormField>

            <UFormField name="admins" label="admins">
              <admin-catalog-items-input-admins :admin_ids="state.catalog_admin_ids" @change="handleChangeAdmins" />
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
            <admin-catalog-items-input-brief
              v-model="state.brief"
              :lastAgrigation="data.find((i) => i.id === id)?.brief.lastAgrigation.sumValue"
            />
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
