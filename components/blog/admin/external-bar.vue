<script setup lang="ts">
const showMainModal = ref(false);

const store = useInitializedBlogStore();
const { discard_admin_changes, post_preview_changes_to_remote } = store;
const { previewed } = storeToRefs(store);
</script>

<template>
  <ClientOnly>
    <div class="m-4 hidden gap-2 md:flex">
      <UButton
        icon="i-pepicons-pencil:wrench-circle-filled"
        size="sm"
        @click="showMainModal = true"
        label="Admin - Blog"
      />

      <UButton
        v-if="previewed"
        icon="i-fa-solid:arrow-alt-circle-up"
        size="sm"
        @click="post_preview_changes_to_remote"
        label="Post previewed changes to remote"
      />

      <UButton
        v-if="previewed"
        variant="outline"
        color="red"
        size="sm"
        icon="bytesize:close"
        @click="discard_admin_changes"
        label="Discard changes"
      />
    </div>

    <BlogAdminMainModal v-model="showMainModal" />
  </ClientOnly>
</template>
