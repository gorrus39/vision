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
  <div
    class="on-hover border-D ms-auto w-max rounded-[.5vw] border-white font-semibold pt-D-5 pb-D-5 text-M-10 ps-M-10 pe-M-10 me-M-10 md:me-0 md:ps-D-15 md:pe-D-15 md:text-D-20"
    @click="showModal = true"
  >
    {{ label }}
  </div>

  <UModal v-model="showModal" :ui="{ background: 'dark:bg-gray-100' }">
    <div class="flex flex-col text-black gap-M-20 p-D-30 md:gap-D-40">
      <p class="w-full pe-0 ps-0 text-center text-M-16 md:text-D-40">
        {{ $t("language.select-a-language") }}
      </p>
      <div class="border-D-b border-black">
        <USelectMenu
          v-model="tempLanguate"
          :options="languages"
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
        class="focus:outline-none focus:ring-0 dark:bg-black dark:text-white hover:dark:bg-black hover:dark:text-white focus:dark:bg-black focus:dark:text-white active:dark:bg-black active:dark:text-white"
        @click="handleChangeLocale"
        color="black"
        block
        :ui="{ rounded: 'rounded-none' }"
      >
        <span class="text-M-8 md:text-D-24">
          {{ $t("language.select") }}
        </span>
      </UButton>
    </div>
  </UModal>
</template>
