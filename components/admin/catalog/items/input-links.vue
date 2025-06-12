<script setup lang="ts">
import { UButton } from "#components"
import type { TableColumn } from "@nuxt/ui"
import { catalogLinkSchema, type CatalogLink } from "~/types/catalog"
const { ui } = useAppConfig()
const form = useTemplateRef("form")
const showModal = ref(false)
const linksModel = defineModel<CatalogLink[]>({ required: true })
const indexIfEdit = ref<number | null>(null)

const newItem: CatalogLink = {
  description: "",
  link: "",
  catalog_item_id: null,
  title: "",
  src_platform: "",
}

const formState = ref<CatalogLink | null>(null)

const columns: TableColumn<CatalogLink>[] = [
  { accessorKey: "actions", header: "actions", meta: { class: { td: "w-5", th: "w-5" } } },
  { accessorKey: "title", header: "title" },
  {
    accessorKey: "src_platform",
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "platform",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      })
    },
  },
  { accessorKey: "link", header: "link" },
  { accessorKey: "description", header: "description" },
]

const src_platforms = ["telegram", "web", "signal", "other"]

const show_new_item_modal = () => {
  indexIfEdit.value = null
  formState.value = { ...newItem }
  showModal.value = true
}

const edit_item = (item: CatalogLink, index: number) => {
  indexIfEdit.value = index
  formState.value = { ...item }
  showModal.value = true
}

const delete_item = (item: CatalogLink) => {
  if (!linksModel.value) return

  const index = linksModel.value.findIndex((l) => l.title === item.title)
  if (index !== -1) {
    linksModel.value.splice(index, 1) // удаляет элемент по индексу
  }
}

const create_update_item = async () => {
  if (indexIfEdit.value != null) {
    const currentLink = linksModel.value[indexIfEdit.value]
    Object.assign(currentLink, formState.value) // мутирует текущий объект
    showModal.value = false
  } else {
    linksModel.value.unshift({ ...formState.value! }) // добавляем копию
    formState.value = { ...newItem }
    showModal.value = false
  }
}
</script>

<template>
  <div class="rounded-lg border-2 border-solid border-gray-500 p-2">
    <UModal v-model:open="showModal">
      <UButton @click="show_new_item_modal" :icon="ui.iconsExt.add" label="New Link" />

      <template #header>
        <p class="w-full text-center text-black">{{ indexIfEdit === null ? "Add link" : "Edit link" }}</p>
      </template>

      <template #body>
        <UForm
          v-if="formState"
          ref="form"
          @submit="create_update_item"
          :state="formState"
          :attach="false"
          :schema="catalogLinkSchema"
        >
          <div class="space-y-4">
            <UFormField name="title">
              <admin-chanks-form-input class="w-full" v-model="formState.title" placeholder="title" />
            </UFormField>

            <UFormField name="description">
              <admin-chanks-form-textarea class="w-full" v-model="formState.description" placeholder="description" />
            </UFormField>

            <UFormField name="link">
              <admin-chanks-form-input class="w-full" v-model="formState.link" placeholder="link" />
            </UFormField>

            <UFormField name="src_platform" label="platform">
              <USelect class="w-full" v-model="formState.src_platform" :items="src_platforms" />
            </UFormField>
          </div>
        </UForm>
      </template>

      <template #footer>
        <div class="flex w-full justify-center gap-2">
          <UButton
            @click="form?.submit()"
            :icon="indexIfEdit === null ? 'i-ep:circle-plus-filled' : 'i-heroicons-pencil-square-20-solid'"
            :label="indexIfEdit === null ? 'Create' : 'Update'"
          />
          <UButton
            icon="i-heroicons:x-mark-20-solid"
            @click="showModal = false"
            color="error"
            variant="outline"
            label="Close"
          />
        </div>
      </template>
    </UModal>

    <UTable :data="linksModel" :columns>
      <template #actions-cell="{ row }">
        <div class="flex gap-2">
          <UIcon
            class="on-hover h-5 w-5"
            name="i-heroicons-pencil-square-20-solid"
            @click="edit_item(row.original, row.index)"
          />
          <UIcon class="on-hover h-5 w-5" name="i-heroicons-trash-20-solid" @click="delete_item(row.original)" />
        </div>
      </template>

      <template #description-cell="{ row }">
        <div>{{ row.original.description.slice(0, 10) }}...</div>
      </template>
    </UTable>
  </div>
</template>
