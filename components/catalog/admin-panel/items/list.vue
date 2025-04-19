<script setup lang="ts">
import { type FullBriefJson, type FullCatalogItem } from "~/types/catalog"

const showListItemsModal = defineModel<boolean>()
const showForm = ref(false)
const showConfirmation = ref(false)
const selectedId = ref<undefined | number>(undefined)
const toast = useToast()
const loadingDelete = ref(false)

const store = await useInitializedCatalogItemsStore()
const { delete_item_remote } = store
const { items: rows } = storeToRefs(store)
const columns = [
  { key: "actions", label: "actions", class: "w-5" },
  { key: "id", label: "id", sortable: true },
  { key: "title", label: "title", sortable: true },
  { key: "rewards", label: "rewards" },
  { key: "admins", label: "admins" },
  { key: "tags", label: "tags" },
  {
    key: "brief",
    label: "reiting-by-brief",
    sortable: true,
    sort: (a: string, b: string, direction: any) => {
      const aJson = JSON.parse(a) as FullBriefJson
      const bJson = JSON.parse(b) as FullBriefJson

      const value_a: number | null = getBriefAgrigationValue({ items: aJson.items }).sumValue // a[0]?.value
      const value_b: number | null = getBriefAgrigationValue({ items: bJson.items }).sumValue //b[0]?.value

      if (value_a == value_b) return 0
      if (value_a == null) return direction == "asc" ? 1 : -1
      if (value_b == null) return direction == "asc" ? -1 : 1

      return direction == "asc" ? value_b - value_a : value_a - value_b
    },
  },
  { key: "links", label: "links" },
]

const try_delete_item = (id: number | undefined) => {
  selectedId.value = id
  showConfirmation.value = true
}

const try_edit_item = (id: number | undefined) => {
  selectedId.value = id
  showForm.value = true
}

const try_add_item = () => {
  selectedId.value = undefined
  showForm.value = true
}

const delete_item = async () => {
  loadingDelete.value = true
  const id = selectedId.value
  if (!id) {
    toast.add({ title: "front. id:undefined", color: "red" })
  } else {
    const { error, success } = await delete_item_remote(id)
    if (success) toast.add({ title: "success" })
    if (error) toast.add({ title: error as string, color: "red" })
  }
  showConfirmation.value = false
  loadingDelete.value = false
}
</script>

<template>
  <UModal v-model="showListItemsModal" fullscreen :ui="{ fullscreen: 'h-auto min-h-[100vh]' }">
    <ChanksAreYouShure v-model="showConfirmation">
      <p class="text-center">Delete item id: {{ selectedId }}</p>
      <div class="flex justify-center gap-2">
        <UButton @click="delete_item" :loading="loadingDelete" label="delete" color="red" />
        <UButton
          @click="showConfirmation = false"
          :disabled="loadingDelete"
          label="cancel"
          color="red"
          variant="outline"
        />
      </div>
    </ChanksAreYouShure>

    <div class="space-y-2 p-2 text-black">
      <!-- {{ rows[0].reitings }} -->
      <div class="space-x-2">
        <UButton @click="try_add_item" icon="i-ep:circle-plus-filled" label="Add item" />

        <UButton
          icon="i-heroicons:x-mark-20-solid"
          @click="showListItemsModal = false"
          color="red"
          variant="outline"
          label="Close"
        />
      </div>
      <hr />
      <UTable :rows="rows" :columns="columns">
        <template #actions-data="{ row }">
          <div class="flex gap-2">
            <UIcon class="on-hover h-5 w-5" name="i-heroicons-pencil-square-20-solid" @click="try_edit_item(row.id)" />
            <UIcon class="on-hover h-5 w-5" name="i-heroicons-trash-20-solid" @click="try_delete_item(row.id)" />
          </div>
        </template>

        <template #rewards-data="{ row }">
          <div>
            <span>{{ row.rewards.length }} reward{{ row.rewards.length > 1 ? "s" : "" }}</span>
            <span class="flex items-center space-x-1">
              <img
                class="w-4"
                v-for="reward of row.rewards"
                :key="reward.id"
                :src="getRewardImageUrl(reward.img_path)"
                alt="img"
              />
            </span>
          </div>
        </template>

        <template #admins-data="{ row }">
          <div>
            <span>{{ row.admins.length }} admin{{ row.admins.length > 1 ? "s" : "" }}</span>
            <span class="flex items-center space-x-1">
              <img
                class="w-4"
                v-for="admin of row.admins"
                :key="admin.id"
                :src="getCatalogAdminImageUrl(admin.avatar_path)"
                alt="img"
              />
            </span>
          </div>
        </template>

        <template #brief-data="{ row }: { row: FullCatalogItem }">
          <div>
            <div>{{ getBriefAgrigationValue({ items: JSON.parse(row.brief).items }).sumValue }}</div>
          </div>
        </template>

        <template #links-data="{ row }: { row: FullCatalogItem }">
          <div>{{ row.links.length }} link{{ row.links.length > 1 ? "`s" : "" }}</div>
        </template>

        <template #tags-data="{ row }: { row: FullCatalogItem }">
          <div>
            <b>{{ JSON.parse(row.tags).length }}</b> tag{{ JSON.parse(row.tags).length > 1 ? "`s" : "" }}
          </div>
        </template>
      </UTable>
    </div>

    <CatalogAdminPanelItemsFormEdit v-if="selectedId !== undefined" v-model="showForm" :selectedId="selectedId" />
    <CatalogAdminPanelItemsFormNew v-else v-model="showForm" />
  </UModal>
</template>
