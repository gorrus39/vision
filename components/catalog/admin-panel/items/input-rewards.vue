<script setup lang="ts">
// import { getRewardImageUrl } from "~/server/utils/helpers/catalog";
import type { Reward } from "~/types/catalog";

const store = await useInitializedRewardsStore();
const { items: options } = storeToRefs(store);

const selected = defineModel<Reward[]>();

// watchEffect(() => {
//   if (selected.value?.length && options.value?.length) {
//     // Сопоставляем объекты из selected с объектами из options по id
//     selected.value = selected.value.map((sel) => options.value.find((opt) => opt.id === sel.id) || sel);
//   }
// });

onMounted(() => {
  if (selected.value?.length && options.value?.length) {
    selected.value = selected.value.map((sel) => options.value.find((opt) => opt.id === sel.id) || sel);
  }
});
// watch(
//   [selected, options],
//   ([sel, opts]) => {
//     if (sel?.length && opts?.length) {
//       const updated = sel.map((s) => opts.find((opt) => opt.id === s.id) || s);

//       // Проверяем, изменился ли selected по ссылке
//       const isDifferent = updated.some((item, i) => item !== sel[i]);
//       if (isDifferent) {
//         selected.value = updated;
//       }
//     }
//   },
//   { flush: "post" },
// );
</script>

<template>
  <USelectMenu v-model="selected" :options="options" multiple>
    <template #label>
      <template v-if="selected && selected.length">
        <span>{{ selected.length }} reward{{ selected.length > 1 ? "s" : "" }}</span>
        <span class="flex items-center space-x-1">
          <img
            class="w-4"
            v-for="reward of selected"
            :key="reward.id"
            :src="getRewardImageUrl(reward.img_path)"
            alt="img"
          />
        </span>
      </template>
      <template v-else>
        <span class="truncate text-gray-500 dark:text-gray-400">Select rewards</span>
      </template>
    </template>

    <template #option="{ option }">
      <img class="w-4" :src="getRewardImageUrl(option.img_path)" alt="img" />
      <span>{{ option.id }}</span>
      <span class="truncate">{{ option.name }}</span>
    </template>
  </USelectMenu>
</template>
