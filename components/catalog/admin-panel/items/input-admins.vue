<script setup lang="ts">
// import { getCatalogAdminImageUrl } from "~/server/utils/helpers/catalog";
import type { CatalogAdmin } from "~/types/catalog";

const store = await useInitializedCatalogAdminStore();
const { items: options } = storeToRefs(store);

const selected = defineModel<CatalogAdmin[]>();

// watchEffect(() => {
//   if (selected.value?.length && options.value?.length) {
//     // Сопоставляем объекты из selected с объектами из options по id
//     selected.value = selected.value.map((sel) => options.value.find((opt) => opt.id === sel.id) || sel);
//   }
// });
</script>

<template>
  <USelectMenu v-model="selected" :options="options" multiple>
    <template #label>
      <template v-if="selected && selected.length">
        <span>{{ selected.length }} admin{{ selected.length > 1 ? "s" : "" }}</span>
        <span class="flex items-center space-x-1">
          <img
            class="w-4"
            v-for="admin of selected"
            :key="admin.id"
            :src="getCatalogAdminImageUrl(admin.avatar_path)"
            alt="img"
          />
        </span>
      </template>
      <template v-else>
        <span class="truncate text-gray-500 dark:text-gray-400">Select admins</span>
      </template>
    </template>

    <template #option="{ option }">
      <img class="w-4" :src="getCatalogAdminImageUrl(option.avatar_path)" alt="img" />
      <span>{{ option.id }}</span>
      <span class="truncate">{{ option.name }}</span>
    </template>
  </USelectMenu>
</template>
