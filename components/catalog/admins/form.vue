<script setup lang="ts">
import _ from "lodash";
import { catalogAdminSchema, type CatalogAdmin } from "~/types/catalog";

const getCloneSelectedItem = () => {
  const item = items.value.find((item) => item.id == props.selectedId);
  return _.cloneDeep(item);
};

const showForm = defineModel<boolean>();
const props = defineProps<{
  selectedId: undefined | number;
}>();

const store = await useInitializedCatalogAdminStore();
const { items } = storeToRefs(store);

const { create_or_update_item_remote } = store;
const toast = useToast();

const emptyItem = {
  avatar_path: "",
  link: "",
  name: "",
  description: "",
  frontendFile: undefined,
};

const state = ref<CatalogAdmin>(getCloneSelectedItem() || emptyItem);

const onSubmit = async () => {
  if (props.selectedId) state.value["id"] = props.selectedId;
  const { success, data, error } = await create_or_update_item_remote(state);

  showForm.value = false;
  if (success) {
    toast.add({ title: "success" });
  } else if (error) {
    toast.add({ title: error as string, color: "red" });
  }
};
</script>

<template>
  <UForm class="space-y-4 p-2" @submit="onSubmit" :schema="catalogAdminSchema" :state="state">
    <p class="text-black">{{ props.selectedId ? `Edit item id:${props.selectedId}` : "New item" }}</p>

    <UFormGroup name="name" label="name" required>
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup name="link" label="link" required>
      <UInput v-model="state.link" />
    </UFormGroup>

    <UFormGroup name="description" label="description" required>
      <UTextarea v-model="state.description" />
    </UFormGroup>

    <UFormGroup name="avatar_path" label="avatar_path" required>
      <ChanksInputPhotoAvatar v-model="state" />
    </UFormGroup>

    <div class="space-x-2">
      <UButton type="submit" :label="selectedId ? 'update' : 'create'" />
      <UButton @click="showForm = false" label="close form" variant="outline" color="red" />
    </div>
  </UForm>
</template>
