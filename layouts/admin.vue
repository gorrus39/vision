<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"
const { locale } = useI18n()
const { ui } = useAppConfig()
const { loggedIn, user, clear } = useUserSession()
const route = useRoute()
const toast = useToast()

onMounted(() => {
  const cookie = useCookie("login-status")
  if (cookie.value === "authorization-success") {
    toast.add({ title: "authorization-success" })
  } else if (cookie.value === "authorization-error") {
    toast.add({ title: "authorization-error", color: "error" })
  }
})

const loading = ref(false)
const hydrated = ref(false)

const handleGoToGithub = () => {
  loading.value = true
  window.location.href = "/api/auth/github"
}

const basePath = `/${locale.value}/admin`

const items = computed<NavigationMenuItem[]>(() => {
  const current = route.path

  return [
    {
      label: "Root",
      to: `${basePath}`,
      icon: "i-lucide-home",
      active: current === `${basePath}`,
    },
    {
      label: "Catalog Part",
      icon: "i-lucide-box",
      active: current.startsWith(`${basePath}/catalog`),

      children: [
        {
          label: "Catalog Items",
          to: `${basePath}/catalog/items`,
          icon: "i-lucide-list",
          active: current === `${basePath}/catalog/items`,
        },
        {
          label: "Admins",
          to: `${basePath}/catalog/admins`,
          icon: "i-lucide-shield",
          active: current === `${basePath}/catalog/admins`,
        },
        {
          label: "Rewards",
          to: `${basePath}/catalog/rewards`,
          icon: "i-lucide-gift",
          active: current === `${basePath}/catalog/rewards`,
        },
        {
          label: "Bunners",
          to: `${basePath}/catalog/bunners`,
          icon: "i-lucide-image",
          active: current === `${basePath}/catalog/bunners`,
        },
      ],
    },
    {
      label: "Blog",
      to: `${basePath}/blog`,
      icon: "i-lucide-file-text",
      active: current === `${basePath}/blog`,
    },
    {
      label: "F.A.Q.",
      to: `${basePath}/faq`,
      icon: "i-lucide-help-circle",
      active: current === `${basePath}/faq`,
    },
  ]
})
onMounted(() => (hydrated.value = true))
</script>

<template>
  <div class="min-h-screen bg-blue-50/90 text-black">
    <UContainer class="flex h-16 items-center gap-2 py-2">
      <UButton to="/" :icon="ui.icons.arrowLeft" variant="ghost" label="to Vision" />

      <UButton
        v-if="!loggedIn && hydrated"
        :loading
        :icon="ui.iconsExt.github"
        @click="handleGoToGithub"
        label="Login via GitHub"
        variant="outline"
      />
      <UButton v-else label="logout" @click="clear" />
      <p v-if="loggedIn">user: {{ user?.email }}</p>

      <UNavigationMenu class="ms-auto" v-if="loggedIn" variant="link" :items :ui="{ list: 'gap-8' }" />
    </UContainer>

    <USeparator />

    <UContainer class="py-2">
      <slot v-if="loggedIn" />
    </UContainer>
  </div>
</template>

<style scoped></style>
