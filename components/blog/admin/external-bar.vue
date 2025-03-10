<script setup lang="ts">
const showMainModal = ref(false);

const store = useBlogStore();
const { discard_admin_changes } = store;
const { previewed } = storeToRefs(store);
</script>

<template>
  <ClientOnly>
    <div class="m-4 hidden gap-2 md:flex">
      <UButton
        @click="showMainModal = true"
        icon="i-pepicons-pencil:wrench-circle-filled"
        label="Admin - Blog"
        size="sm"
      />

      <UButton
        v-if="previewed"
        icon="i-fa-solid:arrow-alt-circle-up"
        size="sm"
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
