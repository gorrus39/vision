<script setup lang="ts">
import { UChip } from "#components";
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";
import type { BlogItem } from "~/types/all";
const showSlideover = ref(false);

const toast = useToast();

const showConfirmDeleteItem = ref(false);

const store = useInitializedBlogStore();
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
      <draggable v-model="items_admin" item-key="id" @end="update_admin_items_order">
        <template #item="{ element: item, index }: { element: BlogItem; index: number }">
          <div
            class="grid items-center gap-4 p-1 font-medium text-black"
            :class="[index % 2 === 0 ? 'bg-white' : 'bg-gray-50', { hidden: item.modified === 'deleted' }]"
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
  <!-- <div class="space-y-2 text-black">
    <div>
      <h2><b> items_origin</b></h2>
      <div v-for="item in items_origin">
        <p>item.img: {{ item.img }}</p>
        <p>item.file: {{ item.file }}</p>
        <p>item.order: {{ item.order_index }}</p>
        <hr />
      </div>
    </div>
    <hr />
    <div>
      <h2><b>items_admin</b></h2>
      <div v-for="item in items_admin">
        <p>item.img: {{ item.img }}</p>
        <p>item.file: {{ item.file }}</p>
        <p>item.order: {{ item.order_index }}</p>
        <hr />
      </div>
    </div>
    <hr />

    <div>
      <h2><b>items_view</b></h2>
      <div v-for="item in items_view">
        <p>item.img: {{ item.img }}</p>
        <p>item.file: {{ item.file }}</p>
        <p>item.order: {{ item.order_index }}</p>
        <hr />
      </div>
    </div>
  </div> -->
</template>
