<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui"
import type { AnyItem } from "~/types/admin"
import { bunnerSchema, type Bunner } from "~/types/catalog"

const store = await useInitializedCatalogBunnersStore()
const { items: rows } = storeToRefs(store)
const loading = ref(false)
const showModal = defineModel<boolean>()

const { delete_item_remote, create_item_remote } = store

const columns = [
  { accessorKey: "actions", header: "actions", meta: { class: { td: "w-5", th: "w-5" } } },
  { accessorKey: "id", header: "id" },
  { accessorKey: "img_path", header: "image" },
]

const state = ref<Bunner>({
  img_path: "",
  frontendFile: undefined,
})

const delete_item = async (id: number | undefined) => {
  if (!id) return
  loading.value = true
  await delete_item_remote(id)
  loading.value = false
}

const add_item = async () => {
  loading.value = true
  await create_item_remote(state.value)
  loading.value = false

  state.value = {
    img_path: "",
    frontendFile: undefined,
  }
}
</script>

<template>
  <div class="text-black">
    <div class="space-x-2 p-2"></div>
    <div class="space-y-2 p-2">
      <UForm :state="state" :schema="bunnerSchema">
        <UFormField name="img_path">
          <admin-catalog-bunners-form v-model="state" />
        </UFormField>
      </UForm>
      <UButton
        v-if="state.frontendFile"
        icon="i-ep:circle-plus-filled"
        @click="add_item"
        :loading="loading"
        label="Add"
      />
    </div>
    <hr />
    <UTable :data="rows" :columns="columns">
      <template #actions-cell="{ row }">
        <div class="flex gap-2">
          <UIcon
            class="on-hover h-5 w-5"
            :loading="loading"
            name="i-heroicons-trash-20-solid"
            @click="delete_item(row.original.id)"
          />
        </div>
      </template>
      <template #img_path-cell="{ row }">
        <img class="h-D-500 w-D-1500 object-cover" :src="getBunnerImageUrl(row.original.img_path)" />
      </template>
    </UTable>
  </div>
</template>
