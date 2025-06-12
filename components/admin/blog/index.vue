<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui"
import type { AdminTableModeLiteral, AnyItem, FormEntries, StoreType } from "~/types/admin"
import type { Lang } from "~/types/catalog"
import { provide } from "vue"
import type { Image } from "~/types/common"
import { fullBlogItemSchema, type BlogItem } from "~/types/blog"

const store = useCurrentStore("blogStore")
if (!store) throw new Error("!blogStore")

await callOnce("blog-items", () => store.initData())

const loading = ref(false)
const mode = ref<AdminTableModeLiteral>(A_MODES.BASE)
const filter = ref("")
const lang = ref<Lang>("ru")

const columns: TableColumn<AnyItem>[] = [
  { accessorKey: "actions", header: "Act", meta: { class: { td: "w-24", th: "w-24" } } },
  { accessorKey: "id", header: "ID", meta: { class: { td: "w-12", th: "w-12" } } },
  { accessorKey: "published_at", header: "published_at", meta: { class: { td: "w-12", th: "w-12" } } },
  { accessorKey: "priority", header: "Priority", meta: { class: { td: "w-12", th: "w-12" } } },
  { accessorKey: "images", header: "Image(s)", meta: { class: { td: "w-12", th: "w-12" } } },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "sub_title", header: "Sub Title" },
  { accessorKey: "text", header: "Text", meta: { class: { td: "max-w-28 overflow-hidden" } } },
]

provide<FormEntries<BlogItem>>("formEntries", {
  schema: fullBlogItemSchema,
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
    published_at: new Date(),
  },
  handleSubmit: async (state: Ref<BlogItem>): Promise<{ error?: string | undefined }> => {
    const formData = new FormData()
    // повставлять frontendFile
    // удалить из json frontendFile
    for (let i = 0; i < state.value.images.length; i++) {
      const imageJson: Image = state.value.images[i]
      if (!imageJson.frontendFile) continue

      formData.set(`photo__index_${i}`, imageJson.frontendFile)
      delete state.value.images[i].frontendFile
    }

    formData.set("blogItemJson", JSON.stringify(state.value))

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

provide<StoreType>("storeType", "blogStore")
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
      :store-type="'blogStore'"
      @make-order-changes="store.makeOrderChanges"
    />

    <!-- Filter Table -->
    <admin-chanks-table-mode-base v-else-if="mode === A_MODES.BASE" :columns :filter :store-type="'blogStore'" :lang />
  </div>
</template>
