<script setup lang="ts">
import { catalogLinkSchema, type CatalogLink } from "~/types/catalog";

const showModal = ref(false);

const links = defineModel<CatalogLink[]>();
const indexRef = ref<number | null>(null);

const emptyLink: CatalogLink = {
  description: "",
  link: "",
  catalog_item_id: null,
  title: "",
  src_platform: "",
};

const state = ref({ ...emptyLink });

const columns = [
  { key: "actions", label: "actions", class: "w-5" },
  { key: "title", label: "title" },
  { key: "src_platform", label: "platform", sortable: true },
  { key: "link", label: "link" },
  { key: "description", label: "description" },
];

const src_platforms = ["telegram", "web", "signal", "other"];

const new_item = () => {
  indexRef.value = null;

  state.value = { ...emptyLink };
  showModal.value = true;
};
const edit_item = (item: CatalogLink, index: number) => {
  indexRef.value = index;

  state.value = { ...item };
  showModal.value = true;
};
const delete_item = (item: CatalogLink) => {
  if (!links.value) return;

  const index = links.value.findIndex((l) => l.title === item.title);
  if (index !== -1) {
    links.value.splice(index, 1); // удаляет элемент по индексу
  }
};

const create_update_item = () => {
  if (indexRef?.value != null && links.value) {
    const currentLink = links.value[indexRef.value];
    if (currentLink) {
      Object.assign(currentLink, state.value); // мутирует текущий объект
    }
    showModal.value = false;
  } else {
    links.value?.unshift({ ...state.value }); // добавляем копию
    state.value = { ...emptyLink };
    showModal.value = false;
  }
};
</script>

<template>
  <div class="rounded-lg border-2 border-solid border-gray-500 p-2">
    <div class="flex items-center gap-2">
      <span>links</span>
      <UButton @click="new_item" icon="i-ep:circle-plus-filled" label="New item" />
    </div>

    <UTable :rows="links" :columns="columns">
      <template #actions-data="{ row, index }">
        <div class="flex gap-2">
          <UIcon class="on-hover h-5 w-5" name="i-heroicons-pencil-square-20-solid" @click="edit_item(row, index)" />
          <UIcon class="on-hover h-5 w-5" name="i-heroicons-trash-20-solid" @click="delete_item(row)" />
        </div>
      </template>

      <template #description-data="{ row }: { row: CatalogLink }">
        <div>{{ row.description.slice(0, 10) }}...</div>
      </template>
    </UTable>

    <UModal v-model="showModal">
      <UForm class="space-y-4 p-2 text-black" @submit="create_update_item" :state="state" :schema="catalogLinkSchema">
        <p class="text-center">{{ indexRef ? "Add link" : "Edit link" }}</p>

        <hr />
        <UFormGroup name="title" label="title" required>
          <UInput v-model="state.title" />
        </UFormGroup>

        <UFormGroup name="description" label="description" required>
          <UTextarea v-model="state.description" />
        </UFormGroup>

        <UFormGroup name="link" label="link" required>
          <UInput v-model="state.link" />
        </UFormGroup>

        <UFormGroup name="src_platform" label="platform" required>
          <USelect v-model="state.src_platform" :options="src_platforms" />
        </UFormGroup>

        <hr />
        <div class="flex justify-center gap-2">
          <UButton
            type="submit"
            :icon="indexRef ? 'i-ep:circle-plus-filled' : 'i-heroicons-pencil-square-20-solid'"
            :label="indexRef ? 'Create' : 'Update'"
          />

          <UButton
            icon="i-heroicons:x-mark-20-solid"
            @click="showModal = false"
            color="red"
            variant="outline"
            label="Close"
          />
        </div>
      </UForm>
    </UModal>
  </div>
</template>
