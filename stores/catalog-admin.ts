import _ from "lodash";
import { defineStore } from "pinia";
import { z } from "zod";
import { catalogAdminSchema, type CatalogAdmin } from "~/types/catalog";

const create_updata_item = async (state: Ref<CatalogAdmin>) => {
  try {
    const formData = new FormData();
    const { frontendFile, ...withouteFrontendFile } = state.value;

    formData.append("item", JSON.stringify(withouteFrontendFile));
    if (state.value.frontendFile && state.value.frontendFile) {
      formData.append("frontendFile", state.value.frontendFile);
      formData.append("frontendFile.name", state.value.frontendFile.name);
      formData.append("frontendFile.type", state.value.frontendFile.type);
    }

    const { success, data, error } = await $fetch("/api/catalog-admin/items", { method: "POST", body: formData });
    return { success, data, error };
  } catch (error) {
    return { error };
  }
};

export const useCatalogAdminStore = defineStore("catalogAdminStore", {
  state: () => ({
    items: [] as CatalogAdmin[], //_.cloneDeep(test_items), // изначальные, для отмены превью
    initialized: false,
  }),
  actions: {
    async init() {
      try {
        const { data, success, error } = await $fetch("/api/catalog-admin/items");
        const { data: items, success: s, error: e } = z.array(catalogAdminSchema).safeParse(data);
        if (items) {
          this.items = _.cloneDeep(items);
          this.initialized = true;
        } else {
          console.log("init state catalog-admin ERROR", e);
        }
      } catch (error) {
        console.log("init state catalog-admin ERROR", error);
      }
    },
    async create_or_update_item_remote(state: Ref<CatalogAdmin>) {
      const res = await create_updata_item(state);
      await this.init();

      return res;
    },

    async delete_item_remote(itemId: number | undefined) {
      const res = await $fetch("/api/catalog-admin/items", { method: "DELETE", query: { id: itemId } });

      await this.init();

      return res;
    },
  },
  getters: {},
});

// Автоматический вызов init() при первом использовании стора
export const useInitializedCatalogAdminStore = async () => {
  const store = useCatalogAdminStore();
  if (!store.initialized) {
    await store.init();
  }
  return store;
};
