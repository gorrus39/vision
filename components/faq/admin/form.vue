<script setup lang="ts">
import { fullFaqItemSchema, type FaqImage, type FullFaqItem } from "~/types/faq"
const languages = useLanguages()
const props = defineProps<{
  item: FullFaqItem | null
}>()

const emit = defineEmits(["close-form"])

const store = useFaqStore()
const loading = ref(false)
const toast = useToast()

const defaultState = (): FullFaqItem => ({
  title: "",
  text: "",
  category: "",
  order_index: 0,
  priority: "Low",
  sub_title: "",
  lang: "en",
  images: [],
})
const priorityOptions: ("High" | "Low")[] = ["High", "Low"]

const state = ref<FullFaqItem>(props.item ? { ...props.item } : defaultState())

const submit = async () => {
  loading.value = true

  const formData = new FormData()

  // повставлять frontendFile
  // удалить из json frontendFile
  for (let i = 0; i < state.value.images.length; i++) {
    const imageJson: FaqImage = state.value.images[i]
    if (!imageJson.frontendFile) continue

    formData.set(`photo__index_${i}`, imageJson.frontendFile)
    delete state.value.images[i].frontendFile
  }

  formData.set("faqItemJson", JSON.stringify(state.value))

  let error = null
  const isEdit = props.item !== null
  if (isEdit) {
    error = (await store.updateFaqItem(formData, props.item.id!)).error
  } else {
    error = (await store.createFaqItem(formData)).error
  }

  loading.value = false
  closeForm()

  if (error) toast.add({ title: error as string, color: "red" })
  else toast.add({ title: "successfully!" })
}

const closeForm = () => emit("close-form")
</script>

<template>
  <u-form class="overflow-auto" :state :schema="fullFaqItemSchema" @submit="submit">
    <div class="flex flex-col gap-2 p-2 text-black">
      <h2>
        <b>{{ item ? "Edit" : "New" }}</b> F.A.Q. Item
        {{ item ? `(id: ${item.id})` : "" }}
      </h2>

      <UFormGroup required label="category" name="category">
        <UInput v-model="state.category" />
      </UFormGroup>

      <UFormGroup required label="title" name="title">
        <UInput v-model="state.title" />
      </UFormGroup>

      <UFormGroup label="sub_title" name="sub_title">
        <UInput v-model="state.sub_title" />
      </UFormGroup>

      <ClientOnly>
        <UFormGroup required label="text" name="text">
          <ChanksTextEditor v-model="state.text" />
        </UFormGroup>
      </ClientOnly>

      <div class="flex gap-2">
        <UFormGroup class="flex-1" required label="priority" name="priority">
          <USelect v-model="state.priority" :options="priorityOptions" />
        </UFormGroup>

        <UFormGroup class="flex-1" required label="language" name="lang">
          <USelect v-model="state.lang" :options="languages">
            <template #option="{ option }">
              <span class="mt-px h-2 w-2 shrink-0 rounded-full" :style="{ background: `#${option.color}` }" />
              <UIcon class="h-5 w-5" :name="option.icon" />

              <span class="truncate">{{ option.label }}</span>
            </template>
          </USelect>
        </UFormGroup>
      </div>

      <faq-admin-form-input-photos v-model="state.images" />

      <div class="flex gap-4">
        <UButton type="submit">{{ item ? "Update" : "Create" }}</UButton>
        <UButton variant="outline" color="red" size="sm" @click="closeForm">Close form</UButton>
      </div>
    </div>
  </u-form>
</template>
