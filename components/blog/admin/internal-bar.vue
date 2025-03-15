<script setup lang="ts">
const showMainModal = defineModel<boolean>();
const showForm = ref(false);
const toast = useToast();

const post_changes_loading = ref(false);

const showConfirmModal = ref(false);
const confirmModalValue = ref<"discard changes" | "pevivew changes">(
  "discard changes",
);

const store = useInitializedBlogStore();
const { discard_admin_changes, preview_changes, post_admin_changes_to_remote } =
  store;

const { has_admin_changes } = storeToRefs(store);

const handleConfirmDiscardChanges = () => {
  discard_admin_changes();
  showConfirmModal.value = false;
};

const handlePreviewChanges = async () => {
  await preview_changes();
  showConfirmModal.value = false;
  showMainModal.value = false;
};

const openConfirmDiscard = () => {
  confirmModalValue.value = "discard changes";
  showConfirmModal.value = true;
};

const openConfirmPreview = () => {
  confirmModalValue.value = "pevivew changes";
  showConfirmModal.value = true;
};

const handlePostAdminChanges = async () => {
  if (post_changes_loading.value === false) {
    post_changes_loading.value = true;

    const response = await post_admin_changes_to_remote();
    if (response?.success) toast.add({ title: "POST Success! " });
    post_changes_loading.value = false;
  }
};
</script>

<template>
  <UModal class="text-black" v-model="showConfirmModal">
    <div class="flex flex-col items-center gap-2 p-3">
      <h1>Are you sure {{ confirmModalValue }} ?</h1>

      <div class="space-x-2" v-if="confirmModalValue == 'discard changes'">
        <UButton
          color="red"
          @click="handleConfirmDiscardChanges"
          label="Discard"
        />

        <UButton
          variant="outline"
          @click="showConfirmModal = false"
          label="Cancel"
        />
      </div>

      <div class="space-x-2" v-if="confirmModalValue == 'pevivew changes'">
        <UButton @click="handlePreviewChanges" label="Preview" />

        <UButton
          color="red"
          variant="outline"
          @click="showConfirmModal = false"
          label="Cancel"
        />
      </div>
    </div>
  </UModal>

  <div class="flex gap-2 text-black">
    <UButton
      @click="showForm = true"
      :disabled="post_changes_loading"
      icon="i-ep:circle-plus-filled"
      label="Add item"
    />

    <UButton
      v-if="has_admin_changes"
      @click="openConfirmPreview"
      :disabled="post_changes_loading"
      icon="i-bytesize:eye"
      label="Preview changes"
    />

    <UButton
      v-if="has_admin_changes"
      icon="i-fa-solid:arrow-alt-circle-up"
      size="sm"
      :loading="post_changes_loading"
      @click="handlePostAdminChanges"
      label="Post changes to remote"
    />

    <UButton
      v-if="has_admin_changes"
      variant="outline"
      color="red"
      @click="openConfirmDiscard"
      :disabled="post_changes_loading"
      icon="bytesize:close"
      label="Discard changes"
    />

    <UButton
      variant="outline"
      color="red"
      @click="showMainModal = false"
      :disabled="post_changes_loading"
      icon="bytesize:close"
      :label="has_admin_changes ? 'Close without preview' : 'Close'"
    />
  </div>
  <USlideover v-model="showForm">
    <BlogAdminForm v-model:showForm="showForm" />
  </USlideover>
</template>
