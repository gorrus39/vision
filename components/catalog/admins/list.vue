<script setup lang="ts">
const showModal = defineModel<boolean>();
const showForm = ref(false);

const showConfirmation = ref(false);
const selectedId = ref<number | undefined>(undefined);

const store = await useInitializedCatalogAdminStore();
const { items: rows } = storeToRefs(store);
const { delete_item_remote } = store;
const toast = useToast();

const delete_item = async () => {
  const id = selectedId.value;
  if (!id) {
    toast.add({ title: "front. id:undefined", color: "red" });
  } else {
    const { error, success } = await delete_item_remote(id);
    if (success) toast.add({ title: "success" });
    if (error) toast.add({ title: error, color: "red" });
  }
  showConfirmation.value = false;
};

const try_delete_item = (id: number | undefined) => {
  selectedId.value = id;
  showConfirmation.value = true;
};

const columns = [
  { key: "actions", label: "actions", class: "w-5" },
  { key: "id", label: "id", class: "w-5", sortable: true },
  { key: "avatar_path", label: "image", class: "w-10" },
  { key: "name", label: "name", class: "w-10", sortable: true },
  { key: "link", label: "link" },
  { key: "description", label: "description", class: "" },
];

const try_edit_item = (id: number | undefined) => {
  selectedId.value = id;
  showForm.value = true;
};

const try_add_item = () => {
  selectedId.value = undefined;
  showForm.value = true;
};
</script>

<template>
  <UModal v-model="showModal" fullscreen>
    <USlideover v-model="showForm">
      <CatalogAdminsForm v-model="showForm" :selectedId="selectedId" />
    </USlideover>

    <ChanksAreYouShure v-model="showConfirmation">
      <p class="text-center">Delete item id: {{ selectedId }}</p>
      <div class="flex justify-center gap-2">
        <UButton @click="delete_item" label="delete" color="red" />
        <UButton @click="showConfirmation = false" label="cancel" color="red" variant="outline" />
      </div>
    </ChanksAreYouShure>

    <div class="m-2 space-x-2">
      <UButton @click="try_add_item" label="add item" />
      <UButton @click="showModal = false" label="close" color="red" variant="outline" />
    </div>

    <UTable class="m-2 rounded-[5px] border border-solid border-gray-400" :rows="rows" :columns="columns">
      <template #actions-data="{ row }">
        <div class="flex gap-2">
          <UIcon class="on-hover h-5 w-5" name="i-heroicons-pencil-square-20-solid" @click="try_edit_item(row.id)" />
          <UIcon class="on-hover h-5 w-5" name="i-heroicons-trash-20-solid" @click="try_delete_item(row.id)" />
        </div>
      </template>

      <template #description-data="{ row }">
        <div class="">
          {{ row.description }}
        </div>
      </template>

      <template #avatar_path-data="{ row }">
        <div>
          <img :src="getCatalogAdminImageUrl(row.avatar_path)" alt="img" width="50" />
        </div>
      </template>
    </UTable>
  </UModal>
</template>
