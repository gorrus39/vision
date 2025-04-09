<script setup lang="ts">
import { CatalogAdminPanelItemsInputTags } from "#components";
import _ from "lodash";
import { fullCatalogItemSchema, type FullCatalogItem } from "~/types/catalog";
const store = await useInitializedCatalogItemsStore();
const { create_or_update_item_remote } = store;
const toast = useToast();
const isLoading = ref(false);

const showForm = defineModel<boolean>();

const emptyItem = {
  title: "",
  rewards: [],
  admins: [],
  reitings: [],
  tags: "[]",
};

const state = ref<FullCatalogItem>(emptyItem);

const handleSubmit = async () => {
  isLoading.value = true;
  const { error, success } = await create_or_update_item_remote(state.value);
  if (success) {
    toast.add({ title: "success" });
  } else {
    toast.add({ title: error as string, color: "red" });
  }
  state.value = emptyItem;
  showForm.value = false;
  isLoading.value = false;
};
</script>
<template>
  <UModal v-model="showForm" fullscreen>
    <div class="space-y-2 p-2 text-black">
      <div class="space-x-2">
        <UButton
          icon="i-heroicons:x-mark-20-solid"
          @click="showForm = false"
          color="red"
          variant="outline"
          :disabled="isLoading"
          label="Close"
        />
      </div>

      <UForm class="space-y-2" @submit="handleSubmit" :state="state" :schema="fullCatalogItemSchema">
        <h2>Add item</h2>

        <UFormGroup name="title" label="title" required>
          <UInput v-model="state.title" />
        </UFormGroup>

        <div class="flex gap-2">
          <UFormGroup name="rewards" label="rewards">
            <CatalogAdminPanelItemsInputRewards v-model="state.rewards" />
          </UFormGroup>

          <UFormGroup name="admins" label="admins">
            <CatalogAdminPanelItemsInputAdmins v-model="state.admins" />
          </UFormGroup>
        </div>

        <UFormGroup name="tags" label="tags">
          <CatalogAdminPanelItemsInputTags v-model="state.tags" />
        </UFormGroup>

        <UFormGroup name="reitings" label="reitings">
          <CatalogAdminPanelItemsInputReitings v-model="state.reitings" :isLoading="isLoading" />
        </UFormGroup>

        <UButton type="submit" icon="i-ep:circle-plus-filled" label="Create" :loading="isLoading" />
      </UForm>
    </div>
  </UModal>
</template>
