<script setup lang="ts">
import { CatalogAdminPanelItemsInputTags } from "#components";
import _ from "lodash";
import { fullCatalogItemSchema, type FullCatalogItem } from "~/types/catalog";
const store = await useInitializedCatalogItemsStore();
const { items } = storeToRefs(store);
const { create_or_update_item_remote } = store;
const toast = useToast();
const isLoading = ref(false);

const props = defineProps<{
  selectedId: number;
}>();

const showForm = defineModel<boolean>();

const initItem = (newId: number) => items.value.find((item) => item.id === props.selectedId);

const state = ref<FullCatalogItem | undefined>(initItem(props.selectedId));
watch(
  () => props.selectedId,
  (newId) => {
    state.value = initItem(newId); // Обновляем state, когда меняется selectedId
  },
);

const handleSubmit = async () => {
  if (state.value === undefined) return;

  isLoading.value = true;
  const { error, success } = await create_or_update_item_remote(state.value);
  if (success) {
    toast.add({ title: "success" });
  } else {
    toast.add({ title: error as string, color: "red" });
  }
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

      <UForm class="space-y-2" v-if="state" @submit="handleSubmit" :state="state" :schema="fullCatalogItemSchema">
        <h2>{{ `Edit item id: ${selectedId}` }}</h2>

        <UFormGroup name="title" label="title" required>
          <UInput v-model="state.title" />
        </UFormGroup>

        <!-- <div class="flex gap-2">
          <UFormGroup name="rewards" label="rewards">
            <CatalogAdminPanelItemsInputRewards v-model="state.rewards" />
          </UFormGroup>

          <UFormGroup name="admins" label="admins">
            <CatalogAdminPanelItemsInputAdmins v-model="state.admins" />
          </UFormGroup>
        </div> -->

        <UFormGroup name="tags" label="tags">
          <CatalogAdminPanelItemsInputTags v-model="state.tags" />
        </UFormGroup>

        <UFormGroup name="reitings" label="reitings">
          <CatalogAdminPanelItemsInputReitings v-model="state.reitings" :isLoading="isLoading" />
        </UFormGroup>

        <UButton type="submit" icon="i-heroicons-pencil-square-20-solid" label="Update" :loading="isLoading" />
      </UForm>
    </div>
  </UModal>
</template>
