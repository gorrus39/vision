<script setup lang="ts">
import { BlogItemSchema } from "~/types/all";
import type { BlogItem } from "~/types/all";
import type { FormSubmitEvent } from "#ui/types";
import _ from "lodash";
const store = await useInitializedBlogStore();
const { items_admin } = storeToRefs(store);

const toast = useToast();

const { create_admin_item, update_admin_item } = await useInitializedBlogStore();

const props = defineProps<{
  showForm: Boolean;
  selectedItem?: BlogItem | null;
  adminItemsLang?: "en" | "ru" | "cn";
}>();

const languages = [
  {
    label: "Russian",
    icon: "i-cif:ru",
    value: "ru",
  },
  {
    label: "Chinese",
    icon: "i-cif:cn",
    value: "cn",
  },
  {
    label: "English",
    icon: "i-cif:us",
    value: "en",
  },
];

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
      image_paths: [null, null, null, null, null],
      sub_title: "",
      text: "",
      priority: priorityOptions[1],
      order_index: -1,
      files: [null, null, null, null, null],
      lang: props.adminItemsLang || "en",
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
  <!-- <div class="text-black">
    <p>state.image_paths:</p>
    <ul>
      <li v-for="path in state.image_paths">- {{ path }}</li>
    </ul>
    <hr />

    <p>state.files: {{ state.files }}</p>
  </div> -->
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
          <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(state.published_at, 'd MMM, yyy')" />
          <template #panel="{ close }">
            <BlogAdminFormDatePicker v-model="state.published_at" is-required @close="close" />
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

    <UFormGroup v-if="typeof state.sub_title == 'string'" label="sub_title" name="sub_title">
      <UInput v-model="state.sub_title" />
    </UFormGroup>

    <ClientOnly>
      <UFormGroup required label="text" name="text">
        <ChanksTextEditor v-model="state.text" />
        <!-- <UTextarea v-model="state.text" resize /> -->
      </UFormGroup>
    </ClientOnly>

    <div class="flex gap-2">
      <UFormGroup class="flex-1" required label="priority" name="priority">
        <USelect v-model="state.priority" :options="priorityOptions" />
      </UFormGroup>

      <UFormGroup class="flex-1" required label="language" name="lang">
        <USelect v-model="state.lang" :options="languages">
          <template #option="{ option }">
            <span class="mt-px h-2 w-2 flex-shrink-0 rounded-full" :style="{ background: `#${option.color}` }" />
            <UIcon class="h-5 w-5" :name="option.icon" />

            <span class="truncate">{{ option.label }}</span>
          </template>
        </USelect>
      </UFormGroup>
    </div>

    <BlogAdminFormInputPhotos v-model="state" />

    <div class="flex gap-4">
      <UButton type="submit">{{ selectedItem ? "Update" : "Create" }}</UButton>
      <UButton variant="outline" color="red" size="sm" @click="closeSlideover">Close form</UButton>
    </div>
  </UForm>
</template>
