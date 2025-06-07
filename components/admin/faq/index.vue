<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui"
import type { AdminTableModeLiteral, AnyItem, FormEntries, StoreType } from "~/types/admin"
import type { Lang } from "~/types/catalog"
import { provide } from "vue"
import type { Image } from "~/types/common"
import type { FullFaqItem } from "~/types/faq"

const store = useCurrentStore("faqStore")

await callOnce("faq-items", () => store.initData())

const loading = ref(false)
const mode = ref<AdminTableModeLiteral>(A_MODES.BASE)
const filter = ref("")
const lang = ref<Lang>("ru")

const columns: TableColumn<AnyItem>[] = [
  { accessorKey: "actions", header: "Act", meta: { class: { td: "w-24", th: "w-24" } } },
  { accessorKey: "id", header: "ID", meta: { class: { td: "w-12", th: "w-12" } } },
  { accessorKey: "priority", header: "Priority", meta: { class: { td: "w-12", th: "w-12" } } },
  { accessorKey: "images", header: "Image(s)", meta: { class: { td: "w-12", th: "w-12" } } },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "sub_title", header: "Sub Title" },
  { accessorKey: "text", header: "Text", meta: { class: { td: "max-w-28 overflow-hidden" } } },
]

provide<FormEntries<FullFaqItem>>("formEntries", {
  lang,
  emptyItem: {
    title: "13",
    text: "123",
    category: "123",
    order_index: 0,
    priority: "Low",
    sub_title: "er",
    lang: (() => lang.value)(),
    images: [],
  },
  handleSubmit: async (state: Ref<FullFaqItem>): Promise<{ error?: string | undefined }> => {
    const formData = new FormData()
    // повставлять frontendFile
    // удалить из json frontendFile
    for (let i = 0; i < state.value.images.length; i++) {
      const imageJson: Image = state.value.images[i]
      if (!imageJson.frontendFile) continue

      formData.set(`photo__index_${i}`, imageJson.frontendFile)
      delete state.value.images[i].frontendFile
    }

    formData.set("faqItemJson", JSON.stringify(state.value))

    let error = undefined
    const id = state.value.id
    if (id) {
      error = (await store.updateItem(formData, id)).error
    } else {
      error = (await store.createItem(formData)).error
    }
    return { error }
  },
})

provide<StoreType>("storeType", "faqStore")
</script>

<template>
  <div class="flex flex-col gap-2">
    <UTabs v-model="mode" :items="adminTableModes" color="secondary" />

    <div class="flex items-center gap-2">
      <admin-chanks-button-new-item :loading :disabled="mode !== A_MODES.BASE" :lang />
      <UInput
        class="w-64"
        v-model="filter"
        color="secondary"
        :disabled="mode !== A_MODES.BASE"
        placeholder="Filter..."
      />
      <admin-chanks-button-post-order-changes :mode @start-post="loading = true" @end-post="loading = false" />
      <admin-chanks-tabs-lang class="ms-auto" v-model="lang" :disabled="mode !== A_MODES.BASE" />
    </div>

    <!-- Drag Table -->
    <admin-chanks-table-mode-drag
      v-if="mode === A_MODES.DRAG"
      :columns
      :lang
      :store-type="'faqStore'"
      @make-order-changes="store.makeOrderChanges"
    />

    <!-- Filter Table -->
    <admin-chanks-table-mode-base v-else-if="mode === A_MODES.BASE" :columns :filter :store-type="'faqStore'" :lang />
  </div>
</template>
