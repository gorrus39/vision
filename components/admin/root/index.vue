<script setup lang="ts">
import { type Image, type SlugAsset } from "~/types/common"
import type { FormError } from "#ui/types"

const loading = ref(false)
const slug = "home__always-relevant"
const toast = useToast()

const store = useSlugAssetsStore()
await store.initData()

type TextContentJSON = {
  ru: string
  en: string
  cn: string
}

type SlugAssetFront = SlugAsset & { text_content_json: TextContentJSON }

const text_content_default = { ru: "", en: "", cn: "" }

const emptyItem: SlugAssetFront = {
  slug,
  images: [],
  title: "",
  text_content: "",
  text_content_json: text_content_default,
}

const getRecord = () => store.homeAlwaysRelevant[0]

const initState = (): SlugAssetFront => {
  const slugAsset = getRecord()
  if (slugAsset) {
    return {
      ...slugAsset,
      text_content_json: JSON.parse(slugAsset.text_content || "") as unknown as TextContentJSON,
    }
  } else {
    return { ...emptyItem }
  }
}

const state = ref(initState())

const text_content_validate = () => {
  if (!state.value) return
  return Object.values(state.value.text_content_json).some((val) => val && val.trim().length > 0)
}

const img_path_validate = () => {
  if (!state.value) return
  return state.value.images && state.value.images.length > 0
}
const validate = (state: any): FormError[] => {
  const errors = []
  if (!text_content_validate()) errors.push({ name: "text_content", message: "Required any value" })
  if (!img_path_validate()) errors.push({ name: "images", message: "Required" })
  return errors
}

const onSubmit = async () => {
  loading.value = true
  const formData = new FormData()
  // повставлять frontendFile
  // удалить из json frontendFile
  for (let i = 0; i < state.value.images.length; i++) {
    const imageJson: Image = state.value.images[i]
    if (!imageJson.frontendFile) continue

    formData.set(`photo__index_${i}`, imageJson.frontendFile)
    delete state.value.images[i].frontendFile
  }

  state.value.text_content = JSON.stringify(state.value.text_content_json)
  formData.set("slugAssetItemJson", JSON.stringify(state.value))

  let error = undefined
  const id = state.value.id
  const slugAsset = getRecord()

  if (slugAsset) {
    error = (await store.updateItem(formData, slugAsset.id!)).error
  } else {
    error = (await store.createItem(formData)).error
  }

  if (error) {
    toast.add({ title: String(error), color: "error" })
    console.log(error)
  } else toast.add({ title: "Successfully!" })
  loading.value = false
}
</script>

<template>
  <UForm class="space-y-4" v-if="state" :state="state" @submit="onSubmit" :validate="validate">
    <UFormField name="text_content">
      <div class="flex items-start gap-4">
        <admin-chanks-form-textarea v-model="state.text_content_json.en" placeholder="EN 🇺🇸" />
        <admin-chanks-form-textarea v-model="state.text_content_json.ru" placeholder="RU 🇷🇺" />
        <admin-chanks-form-textarea v-model="state.text_content_json.cn" placeholder="CN 🇨🇳" />
      </div>
    </UFormField>

    <hr />

    <UFormField name="images" label="banner">
      <admin-chanks-form-input-images
        v-model="state.images"
        refer_type="slug-asset"
        :max-amount="1"
        :can-title="false"
      />
    </UFormField>

    <UButton type="submit" label="Submit" :loading="loading" />
  </UForm>
</template>
