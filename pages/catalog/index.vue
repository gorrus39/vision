<script setup lang="ts">
import { forEach } from "lodash";
import { getRewardImageUrl } from "~/server/utils/helpers/catalog";
import { rewardSchema, type Reward } from "~/types/catalog";
const toast = useToast();
const rewards = ref<Reward[]>([]);
const state = ref<Reward>({
  img_path: "",
  name: "",
  description: "",
  frontendFile: undefined,
});

const onSubmit = async () => {
  const formData = new FormData();
  const { frontendFile, ...withouteFrontendFile } = state.value;

  formData.append("item", JSON.stringify(withouteFrontendFile));
  if (state.value.frontendFile) {
    formData.append("frontendFile", state.value.frontendFile);
    formData.append("frontendFile.name", state.value.frontendFile.name);
    formData.append("frontendFile.type", state.value.frontendFile.type);
  }

  const { success, data, error } = await $fetch("/api/catalog-rewards/items", { method: "POST", body: formData });

  if (success) {
    toast.add({ title: "success" });
  } else {
    toast.add({ title: error, color: "red" });
  }
};

const getRewards = async () => {
  const { success, data, error } = await $fetch("/api/catalog-rewards/items");
  if (!Array.isArray(data)) return;

  rewards.value = [];
  data.forEach((item) => {
    const { data, success, error } = rewardSchema.safeParse(item);
    if (data) rewards.value.push(data);
  });
};
</script>

<template>
  <UForm @submit="onSubmit" :schema="rewardSchema" :state="state">
    <UFormGroup name="name" label="name" required>
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup name="description" label="description" required>
      <UTextarea v-model="state.description" />
    </UFormGroup>

    <UFormGroup name="img_path" label="img_path" required>
      <ChanksInputPhoto v-model="state" />
    </UFormGroup>
    <UButton type="submit" label="click" />
  </UForm>
  <p>{{ rewards }}</p>
  <img v-for="{ img_path } in rewards" width="100" :src="getRewardImageUrl(img_path)" alt="img" />
  <UButton label="get rewards" @click="getRewards" />
</template>
