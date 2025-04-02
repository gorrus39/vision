import _ from "lodash";
import { defineStore } from "pinia";
import { z } from "zod";
import { rewardSchema, type Reward } from "~/types/catalog";

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

export const useRewardStore = defineStore("rewardStore", {
  state: () => ({
    items: [] as Reward[], //_.cloneDeep(test_items), // изначальные, для отмены превью
    initialized: false,
  }),
  actions: {
    async init() {
      try {
        const { data, success, error } = await $fetch("/api/catalog-rewards/items");
        const { data: items, success: s, error: e } = z.array(rewardSchema).safeParse(data);
        if (items) {
          this.items = _.cloneDeep(items);
        }
      } catch (error) {
        console.log("init state catalog-rewards ERROR", error);
      }
    },
    async create_or_update_item_remote(state: Ref<Reward>) {
      const res = await create_updata_item(state);
      await this.init();

      return res;
    },

    async delete_item_remote(itemId: number | undefined) {
      const res = await $fetch("/api/catalog-rewards/items", { method: "DELETE", query: { id: itemId } });

      await this.init();

      return res;
    },
  },
  getters: {},
});

// Автоматический вызов init() при первом использовании стора
export const useInitializedRewardsStore = async () => {
  const store = useRewardStore();
  if (!store.initialized) {
    await store.init();
  }
  return store;
};
