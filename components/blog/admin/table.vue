<script setup lang="ts">
import { UChip } from "#components";
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";
import type { BlogItem } from "~/types/blog";
const showSlideover = ref(false);

const toast = useToast();

const props = defineProps<{
  adminItemsLang: "ru" | "en" | "cn";
}>();

const showConfirmDeleteItem = ref(false);

const store = await useInitializedBlogStore();
const { items_admin } = storeToRefs(store);

const { update_admin_items_order, delete_admin_item } = store;

const selectedItem = ref<BlogItem | null>(null);

const handleClickDeleteIcon = (item: BlogItem) => {
  selectedItem.value = item;
  showConfirmDeleteItem.value = true;
};

const closeConfirmModal = () => {
  selectedItem.value = null;
  showConfirmDeleteItem.value = false;
};

const handleDeleteItem = () => {
  delete_admin_item(selectedItem.value?.id);
  toast.add({ title: "Successfully!" });

  closeConfirmModal();
};

const handleClickEditItem = (item: BlogItem) => {
  selectedItem.value = item;
  showSlideover.value = true;
};

const handleChangeOrder = () => {
  // const acc: { [key: number]: number } = {};
  // const list: { [key: number]: number } = items_admin_by_lang.value.reduce((acc, item, index) => {
  //   acc[item.id] = index;
  //   return acc;
  // }, acc);

  update_admin_items_order();
  // update_admin_items_order(list);
  // items_admin_by_lang.value = filteredItems();
};
// const filteredItems = () => items_admin.value.filter((item) => item.lang === props.adminItemsLang);

// const items_admin_by_lang = ref(filteredItems());
</script>

<template>
  <UModal class="text-black" v-model="showConfirmDeleteItem">
    <div class="flex flex-col items-center gap-2 p-3">
      <h1>Are you sure delete item?</h1>
      <h2>item_id: {{ selectedItem?.id }}</h2>
      <div class="space-x-2">
        <UButton color="red" @click="handleDeleteItem">Delete</UButton>
        <UButton color="red" variant="outline" @click="closeConfirmModal">Cancel</UButton>
      </div>
    </div>
  </UModal>

  <USlideover v-model="showSlideover">
    <BlogAdminForm v-model:showForm="showSlideover" :selectedItem="selectedItem" />
  </USlideover>

  <div class="max-w-[100vw] overflow-hidden rounded-lg border border-gray-300 text-black shadow-md">
    <div
      class="grid items-center gap-4 bg-gray-200 p-1 text-sm font-bold"
      :style="{
        gridTemplateColumns: '50px 50px 100px 100px 100px 100px 80px 100px auto',
      }"
    >
      <div>Act</div>
      <div>ID</div>
      <div>Priority</div>
      <div>Title</div>
      <div>Published At</div>
      <div>Category</div>
      <div>Image(s)</div>
      <div>Sub Title</div>
      <div>Text</div>
    </div>
    <div class="max-h-[80vh] overflow-auto">
      <draggable v-model="items_admin" item-key="id" @end="handleChangeOrder">
        <template #item="{ element: item, index }: { element: BlogItem; index: number }">
          <div
            class="grid items-center gap-4 p-1 font-medium text-black"
            :class="[
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
              { hidden: item.modified === 'deleted' },
              { hidden: item.lang !== adminItemsLang },
            ]"
            :style="{
              gridTemplateColumns: '50px 50px 100px 100px 100px 100px 80px 100px auto',
            }"
          >
            <div class="flex justify-evenly">
              <UIcon class="on-hover" name="i-mdi-light:delete" @click="handleClickDeleteIcon(item)" />
              <UIcon class="on-hover" name="i-heroicons-pencil-square" @click="handleClickEditItem(item)" />
            </div>
            <div class="p-1">
              <UChip v-if="item.modified"> {{ item.id }} </UChip>
              <span v-else>{{ item.id }}</span>
            </div>
            <div class="p-1">
              {{ item.priority == "High" ? `🔥 ${item.priority}` : item.priority }}
            </div>
            <div class="p-1">{{ item.title }}</div>
            <div class="p-1">
              {{ formatDate(item.published_at) }}
            </div>
            <div class="p-1">{{ item.category }}</div>
            <div class="flex items-center justify-center px-2 py-2">
              <span class="font-bold text-green-600" v-if="item.image_paths[0] !== null">✔</span>
              <span class="font-bold text-red-600" v-else>✘</span>
            </div>
            <div class="p-1">{{ item.sub_title }}</div>
            <div class="relative truncate p-1">
              <span
                class="block overflow-hidden text-ellipsis whitespace-nowrap"
                style="
                  mask-image: linear-gradient(to right, black 80%, transparent);
                  -webkit-mask-image: linear-gradient(to right, black 80%, transparent);
                "
              >
                {{ item.text }}
              </span>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
