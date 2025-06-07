<script setup lang="ts">
import { type SlugAsset } from "~/types/common"
import type { FormError } from "#ui/types"
const { create_or_update_by_method, fetchData } = useSlugAssetsStore()

// const modal = useModal()
const loading = ref(false)
const slug = "home__always-relevant"
const toast = useToast()

const props = defineProps<{
  slugAsset?: SlugAsset | undefined
}>()

type TextContent = {
  ru: string
  en: string
  cn: string
}

type State =
  | {
      text_content: TextContent
      img_path: string | undefined
      frontendFile: File | undefined
      slug: string
      id?: number
    }
  | undefined

const text_content_default = { ru: "", en: "", cn: "" }

const initState = (): State => {
  if (!props.slugAsset)
    return {
      text_content: text_content_default,
      img_path: "",
      frontendFile: undefined,
      slug,
    }

  const text_content: TextContent = props.slugAsset.text_content
    ? (JSON.parse(props.slugAsset.text_content) as TextContent)
    : text_content_default

  const img_path = props.slugAsset.img_path || ""

  const frontendFile = undefined

  const id = props.slugAsset.id
  return { text_content, img_path, frontendFile, slug, id }
}

const state = ref(initState())

const text_content_validate = () => {
  if (!state.value) return
  return Object.values(state.value.text_content).some((val) => val && val.length > 0)
}

const img_path_validate = () => {
  if (!state.value) return
  return state.value.img_path && state.value.img_path.length > 0
}
const validate = (state: any): FormError[] => {
  const errors = []
  if (!text_content_validate()) errors.push({ path: "text_content", message: "Required any value" })
  if (!img_path_validate()) errors.push({ path: "img_path", message: "Required" })
  console.log(errors)
  return errors
}

const handleSave = async () => {
  const resultState: SlugAsset = {
    text_content: JSON.stringify(state.value?.text_content),
    img_path: state.value?.img_path,
    frontendFile: state.value?.frontendFile,
    slug,
    id: state.value?.id,
  }
  const method = props.slugAsset ? "PUT" : "POST"

  loading.value = true
  await create_or_update_by_method(resultState, method)
  await fetchData()
  toast.add({ title: "successfully!" })
  loading.value = false
  // modal.close()
}
</script>

<template>
  <div></div>
  <!-- <UModal fullscreen :ui="{ base: 'p-4 space-y-4' }">
    <div class="flex gap-4">
      <UButton :disabled="loading" @click="modal.close" label="close" color="red" variant="outline" />
    </div>
    <hr />

    <UForm class="space-y-4" v-if="state" :state="state" @submit="handleSave" :validate="validate">
      <UFormGroup name="text_content" label="text_content">
        <div class="flex gap-4">
          <UTextarea v-model="state.text_content.en" placeholder="EN 🇺🇸" />
          <UTextarea v-model="state.text_content.ru" placeholder="RU 🇷🇺" />
          <UTextarea v-model="state.text_content.cn" placeholder="CN 🇨🇳" />
        </div>
      </UFormGroup>

      <hr />

      <UFormGroup name="img_path" label="banner">
        <HomeAdminInputPhoto v-model="state" InputPhoto />
      </UFormGroup>

      <UButton type="submit" label="save" :loading="loading" />
    </UForm>
  </UModal> -->
</template>
