<script setup lang="ts">
const showModal = ref(false)
const { setLocale, locale, defaultLocale } = useI18n()

const languages: { label: string; value: "ru" | "en" | "cn" }[] = [
  { label: "РУССКИЙ", value: "ru" },
  { label: "ENGLISH", value: "en" },
  { label: "中文", value: "cn" },
]

const tempLanguate = ref(languages.find((lgObj) => lgObj.value == locale.value))

const handleChangeLocale = () => {
  setLocale(tempLanguate.value?.value ?? defaultLocale)
}

const label = computed(() => {
  const lgObj = languages.find((lgObj) => lgObj.value == locale.value) || languages[0]
  return lgObj.label
})
</script>

<template>
  <UModal v-model:open="showModal">
    <div
      class="on-hover border-D pt-D-5 pb-D-5 text-M-10 ps-M-10 pe-M-10 me-M-10 md:ps-D-15 md:pe-D-15 md:text-D-20 ms-auto w-max rounded-[.5vw] border-white font-semibold md:me-0"
      @click="showModal = true"
    >
      {{ label }}
    </div>

    <template #content>
      <div class="gap-M-20 p-D-30 md:gap-D-40 flex flex-col text-black">
        <p class="text-M-16 md:text-D-40 w-full ps-0 pe-0 text-center">
          {{ $t("language.select-a-language") }}
        </p>
        <div class="border-D-b border-black">
          <USelectMenu
            v-model="tempLanguate"
            :items="languages"
            variant="none"
            :ui="{
              base: 'text-M-10 md:text-D-22',
            }"
            :uiMenu="{
              option: {
                base: ' text-M-10 md:text-D-22',
              },
            }"
          />
        </div>
        <UButton
          class="focus:ring-0 focus:outline-none dark:bg-black dark:text-white hover:dark:bg-black hover:dark:text-white focus:dark:bg-black focus:dark:text-white active:dark:bg-black active:dark:text-white"
          @click="handleChangeLocale"
          color="neutral"
          block
        >
          <span class="text-M-8 md:text-D-24">
            {{ $t("language.select") }}
          </span>
        </UButton>
      </div>
    </template>
  </UModal>
</template>
