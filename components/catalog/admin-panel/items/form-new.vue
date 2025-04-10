<script setup lang="ts">
import _ from "lodash";
import { emptyBriefString, fullCatalogItemSchema, type BriefItemJson, type FullCatalogItem } from "~/types/catalog";
const store = await useInitializedCatalogItemsStore();
const { create_or_update_item_remote } = store;
const toast = useToast();
const isLoading = ref(false);
const briefError = ref<null | string>(null);
const descriptionShortError = ref<null | string>(null);

const showForm = defineModel<boolean>();

const emptyItem: FullCatalogItem = {
  title: "empty",
  rewards: [],
  admins: [],
  reitings: [],
  tags: "[]",
  links: [],
  brief: emptyBriefString,
  description_short: "",
  description_large: "",
  rules: "",
};

const state = ref<FullCatalogItem>(emptyItem);

const invalidDescriptionShort = () => {
  const errors: Record<string, string> = {};
  let json: any;

  try {
    json = JSON.parse(state.value.description_short);
  } catch (err) {
    errors.brief = "Description short must be valid JSON";
  }

  const jsonDescriptionShort = json as {
    ru: string;
    en: string;
    cn: string;
  };

  const isAnyValuePresent = Object.values(jsonDescriptionShort).some((v) => v.trim().length > 0);

  if (!isAnyValuePresent) {
    errors.description_short = "required any value";
  }

  // Если есть ошибки, устанавливаем их в форму
  if (Object.keys(errors).length > 0) {
    descriptionShortError.value = errors.description_short;
    return true; // Возвращаем true, если ошибки есть
  }

  return false; // Нет ошибок
};

const invalidBrief = () => {
  const errors: Record<string, string> = {};
  let briefParsed: any;

  try {
    briefParsed = JSON.parse(state.value.brief);
  } catch (err) {
    errors.brief = "Brief must be valid JSON";
  }

  const jsonBrief = briefParsed as {
    ru: BriefItemJson[];
    en: BriefItemJson[];
    cn: BriefItemJson[];
  };
  if (jsonBrief && typeof jsonBrief === "object") {
    const isAnyLangComplete = Object.entries(jsonBrief).some(([lang, langData]) => {
      return langData.every(({ category, meaning, score }) => {
        if (meaning == undefined || score == undefined) return false;

        const presentMeaning = meaning.trim().length > 0;
        const presentScore = score.trim().length > 0;
        const notInitMeaning = meaning !== "undefined";
        const notInitScore = meaning !== "undefined";
        return presentMeaning && presentScore && notInitMeaning && notInitScore;
      });
    });

    if (!isAnyLangComplete) {
      errors.brief = "At least one language in brief must be fully completed";
    }
  } else {
    errors.brief = "Brief must be a valid object";
  }

  // Если есть ошибки, устанавливаем их в форму
  if (Object.keys(errors).length > 0) {
    briefError.value = errors.brief;
    return true; // Возвращаем true, если ошибки есть
  }

  return false; // Нет ошибок
};

const handleSubmit = async () => {
  if (invalidBrief()) return;
  if (invalidDescriptionShort()) return;

  isLoading.value = true;
  const { error, success } = await create_or_update_item_remote(state.value);
  if (success) {
    toast.add({ title: "success" });
  } else {
    toast.add({ title: error as string, color: "red" });
  }
  state.value = emptyItem;
  showForm.value = false;
  isLoading.value = false;
};
</script>
<template>
  <UModal v-model="showForm" fullscreen>
    <div class="space-y-2 p-2 text-black">
      <UForm class="space-y-2" @submit.prevent="handleSubmit" :state="state" :schema="fullCatalogItemSchema">
        <h2>Add item</h2>
        <hr />
        <!-- <div class="ga2 flex">
          <div v-for="q in Object.values(JSON.parse(state.brief))">
            <p v-for="i in q" v-if="Object.values(JSON.parse(state.brief))[0]">
              {{ i }}
            </p>
          </div>
        </div> -->
        <!-- <UFormGroup name="title" label="title" required>
          <UInput v-model="state.title" :autofocus="false" />
        </UFormGroup> -->

        <!-- <div class="flex gap-2">
          <UFormGroup name="rewards" label="rewards">
            <CatalogAdminPanelItemsInputRewards v-model="state.rewards" />
          </UFormGroup>

          <UFormGroup name="admins" label="admins">
            <CatalogAdminPanelItemsInputAdmins v-model="state.admins" />
          </UFormGroup>
        </div> -->

        <!-- <UFormGroup name="tags" label="tags">
          <CatalogAdminPanelItemsInputTags v-model="state.tags" />
        </UFormGroup> -->

        <!-- <UFormGroup name="links">
          <CatalogAdminPanelItemsInputLinks v-model="state.links" />
        </UFormGroup> -->

        <!-- <UFormGroup name="reitings" label="reitings">
          <CatalogAdminPanelItemsInputReitings v-model="state.reitings" :isLoading="isLoading" />
        </UFormGroup> -->

        <!-- <UFormGroup name="brief" required>
          <CatalogAdminPanelItemsInputBrief v-model="state.brief" @updateError="briefError = $event" />
          <p class="text-red-500" v-if="briefError">{{ briefError }}</p>
        </UFormGroup> -->

        <UFormGroup name="description_short">
          <CatalogAdminPanelItemsInputDescriptionShord
            v-model="state.description_short"
            @updateError="descriptionShortError = $event"
          />

          <p class="text-red-500" v-if="descriptionShortError">{{ descriptionShortError }}</p>
        </UFormGroup>
        <hr />
        <div class="space-x-2">
          <UButton type="submit" icon="i-ep:circle-plus-filled" label="Create" :loading="isLoading" />

          <UButton
            icon="i-heroicons:x-mark-20-solid"
            @click="showForm = false"
            color="red"
            variant="outline"
            :disabled="isLoading"
            label="Close"
          />
        </div>
      </UForm>
    </div>
  </UModal>
</template>
