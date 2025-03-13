<script setup lang="ts">
import { BlogItemSchema } from "~/types/all";
import type { BlogItem } from "~/types/all";
import type { FormSubmitEvent } from "#ui/types";
import _ from "lodash";
const store = useInitializedBlogStore();
const { items_admin } = storeToRefs(store);

const toast = useToast();

const { create_admin_item, update_admin_item } = useInitializedBlogStore();

const props = defineProps<{
  showForm: Boolean;
  selectedItem?: BlogItem | null;
}>();

const emit = defineEmits(["update:showForm"]); // Создаём событие

const closeSlideover = () => {
  emit("update:showForm", false); // Закрываем слайдовер
};
import { format } from "date-fns";

const priorityOptions: ("High" | "Low")[] = ["High", "Low"];

const initModel = props.selectedItem
  ? _.cloneDeep(props.selectedItem)
  : {
      id:
        items_admin.value.reduce((acc, item) => {
          acc = item.id < acc ? item.id : acc;
          return acc;
        }, 0) - 1,
      published_at: new Date(),
      category: "",
      title: "",
      img: null,
      sub_title: "",
      text: "",
      priority: priorityOptions[1],
      order_index: -1,
    };
const state: Ref<BlogItem> = ref(initModel);

async function onSubmit(event: FormSubmitEvent<BlogItem>) {
  if (props.selectedItem)
    update_admin_item(state); // update
  else create_admin_item(state); // create

  emit("update:showForm", false); // Закрываем слайдовер
  toast.add({ title: "Successfully!" });
}
</script>
<template>
  <UForm
    class="max-h-[100vh] space-y-4 overflow-auto p-4 text-black"
    :schema="BlogItemSchema"
    :state="state"
    @submit="onSubmit"
  >
    <h2>
      <b>{{ selectedItem ? "Edit" : "New" }}</b> Blog Item
      {{ selectedItem ? `(id: ${selectedItem.id})` : "" }}
    </h2>
    <div class="flex gap-4">
      <UFormGroup label="published_at" name="published_at">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="format(state.published_at, 'd MMM, yyy')"
          />
          <template #panel="{ close }">
            <BlogAdminFormDatePicker
              v-model="state.published_at"
              is-required
              @close="close"
            />
          </template>
        </UPopover>
      </UFormGroup>

      <UFormGroup required label="category" name="category">
        <UInput v-model="state.category" />
      </UFormGroup>
    </div>

    <UFormGroup required label="title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>

    <UFormGroup
      v-if="typeof state.sub_title == 'string'"
      label="sub_title"
      name="sub_title"
    >
      <UInput v-model="state.sub_title" />
    </UFormGroup>

    <UFormGroup required label="text" name="text">
      <UTextarea v-model="state.text" resize />
    </UFormGroup>

    <UFormGroup required label="priority" name="priority">
      <USelect v-model="state.priority" :options="priorityOptions" />
    </UFormGroup>

    <BlogAdminFormInputPhoto v-model="state" />

    <div class="flex gap-4">
      <UButton type="submit">{{ selectedItem ? "Update" : "Create" }}</UButton>
      <UButton variant="outline" color="red" size="sm" @click="closeSlideover"
        >Close form</UButton
      >
    </div>
    <!-- {{ selectedItem }} -->
  </UForm>
</template>
