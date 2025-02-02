<script setup lang="ts">

const { locale, setLocale } = useI18n()
const localePath = useLocalePath()


</script>

<template>

  <UIcon name="i-logos:angular" class="w-96 h-96" />

  <NuxtLink :to="localePath('index')">{{ $t('home') }}</NuxtLink>
  <hr>

  <NuxtLink :to="localePath('/')">{{ $t('home') }}</NuxtLink>
  <hr>

  <NuxtLink :to="localePath('index', 'en')">Homepage in en</NuxtLink>
  <hr>


  <NuxtLink :to="localePath('index', 'cn')">Homepage in cn</NuxtLink>
  <hr>

  <NuxtLink :to="localePath('index', 'ru')">Homepage in ru</NuxtLink>
  <hr>
  <NuxtLink :to="localePath('index', 'fr')">Homepage in fr</NuxtLink>


  <div>
    <div>
      <button @click="setLocale('en')">en</button>
      <button @click="setLocale('fr')">fr</button>
      <p>{{ $t('welcome') }}</p>
    </div>
  </div>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Welcome to Nuxt UI Starter</h1>
          <ColorScheme>
            <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
          </ColorScheme>
        </div>
      </template>
      <UButton icon="i-heroicons-book-open" to="https://ui.nuxt.com" target="_blank">Open Nuxt UI Documentation
      </UButton>
    </UCard>
  </UContainer>
  <!-- <nav>
    <ul>
      <li>
        <NuxtLink to="/">home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">about</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contacts">contacts</NuxtLink>
      </li>
    </ul>
  </nav> -->
  <slot />

  <h5>locale: {{ locale }}</h5>
  <h4 class="dark:text-yellow-400 text-blue-400">message: {{ $t('welcome') }}</h4>

</template>

<style scoped></style>
