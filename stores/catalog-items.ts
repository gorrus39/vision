import _ from "lodash";
import { defineStore } from "pinia";
import { z } from "zod";
import {
  catalogItemSchema,
  fullCatalogItemSchema,
  rewardSchema,
  type CatalogItem,
  type FullCatalogItem,
  type Reward,
} from "~/types/catalog";

const create_updata_item = async (state: Ref<Reward>) => {
  try {
    const formData = new FormData();
    const { frontendFile, ...withouteFrontendFile } = state.value;

    formData.append("item", JSON.stringify(withouteFrontendFile));
    if (state.value.frontendFile && state.value.frontendFile) {
      formData.append("frontendFile", state.value.frontendFile);
      formData.append("frontendFile.name", state.value.frontendFile.name);
      formData.append("frontendFile.type", state.value.frontendFile.type);
    }

    const { success, data, error } = await $fetch("/api/catalog-rewards/items", { method: "POST", body: formData });
    return { success, data, error };
  } catch (error) {
    return { error };
  }
};

const useCatalogItemsStore = defineStore("catalogItemsStore", {
  state: () => ({
    items: [] as FullCatalogItem[], //_.cloneDeep(test_items), // изначальные, для отмены превью
    // items: [] as FullCatalogItem[], //_.cloneDeep(test_items), // изначальные, для отмены превью
    initialized: false,
  }),
  actions: {
    async init() {
      try {
        const { data } = await useAsyncData(() => $fetch("/api/catalog/items"));
        const { data: items, success, error } = z.array(fullCatalogItemSchema).safeParse(data.value);

        if (!items) throw new Error("error, when parse catalog-items data from backend in store init");

        this.items = _.cloneDeep(items);
        this.initialized = true;
      } catch (error) {
        console.log("init state catalog-rewards ERROR", error);
      }
    },
    async create_or_update_item_remote(state: Ref<FullCatalogItem>) {
      const formData = new FormData();

      formData.append("itemJson", JSON.stringify(state.value));

      try {
        const method = state.value.id ? "PUT" : "POST";
        const { success, error } = await $fetch("/api/catalog/items", { method, body: formData });
        await this.init();

        return { success, error };
      } catch (error) {
        return { error };
      }
    },
    async delete_item_remote(itemId: number) {
      try {
        const { success, error } = await $fetch("/api/catalog/items", { method: "DELETE", query: { id: itemId } });
        await this.init();

        return { success, error };
      } catch (error) {
        return { error };
      }
    },
  },
  getters: {},
});

// Автоматический вызов init() при первом использовании стора
export const useInitializedCatalogItemsStore = async () => {
  const store = useCatalogItemsStore();
  if (!store.initialized) {
    await store.init();
  }
  return store;
};
