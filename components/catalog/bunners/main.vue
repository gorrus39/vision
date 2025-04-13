<script setup lang="ts">
import { bunnerSchema, type Bunner } from "~/types/catalog"

const store = await useInitializedCatalogBunnersStore()
const { items: rows } = storeToRefs(store)
const loading = ref(false)
const showModal = defineModel<boolean>()

const { delete_item_remote, create_item_remote } = store
const columns = [
  { key: "actions", label: "actions", class: "w-5" },
  { key: "id", label: "id" },
  { key: "img_path", label: "image" },
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
  <UModal v-model="showModal" fullscreen :ui="{ fullscreen: 'h-auto' }">
    <div class="text-black">
      <div class="p-2">
        <UButton @click="showModal = false" :disabled="loading" label="close" color="red" variant="outline" />
      </div>
      <hr />
      <div class="p-2">
        <UForm :state="state" :schema="bunnerSchema">
          <UFormGroup name="img_path" label="image">
            <ChanksInputPhotoCatalogBunner v-model="state" />
          </UFormGroup>
        </UForm>
        <UButton v-if="state.frontendFile" @click="add_item" :disabled="loading" label="Add" />
      </div>
      <hr />
      <UTable :rows="rows" :columns="columns">
        <template #actions-data="{ row }: { row: Bunner }">
          <div class="flex gap-2">
            <UIcon
              class="on-hover h-5 w-5"
              :loading="loading"
              :disabled="loading"
              name="i-heroicons-trash-20-solid"
              @click="delete_item(row.id)"
            />
          </div>
        </template>
        <template #img_path-data="{ row }: { row: Bunner }">
          <img class="object-cover h-D-500 w-D-1500" :src="getBunnerImageUrl(row.img_path)" />
        </template>
      </UTable>
    </div>
  </UModal>
</template>
