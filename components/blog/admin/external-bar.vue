<script setup lang="ts">
const showMainModal = ref(false);

const post_changes_loading = ref(false);

const store = await useInitializedBlogStore();
const { discard_admin_changes, post_preview_changes_to_remote } = store;
const { previewed } = storeToRefs(store);

const handlePostReviewedChanges = async () => {
  if (post_changes_loading.value === false) {
    post_changes_loading.value = true;
    await post_preview_changes_to_remote();
    post_changes_loading.value = false;
  }
};
</script>

<template>
  <ClientOnly>
    <div class="m-2 hidden gap-2 md:flex">
      <UButton
        icon="i-lucide:settings"
        size="sm"
        :disabled="post_changes_loading"
        @click="showMainModal = true"
        label="Admin - Blog"
      />

      <UButton
        v-if="previewed"
        icon="i-fa-solid:arrow-alt-circle-up"
        size="sm"
        :loading="post_changes_loading"
        @click="handlePostReviewedChanges"
        label="Post previewed changes to remote"
      />

      <UButton
        v-if="previewed"
        variant="outline"
        color="red"
        size="sm"
        icon="bytesize:close"
        :disabled="post_changes_loading"
        @click="discard_admin_changes"
        label="Discard changes"
      />
    </div>

    <BlogAdminMainModal v-model="showMainModal" />
  </ClientOnly>
</template>
