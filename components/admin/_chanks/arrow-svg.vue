<script setup lang="ts">
defineProps<{
  before: number | null | undefined
  after: number
}>()
</script>

<template>
  <svg
    v-if="before"
    :class="[(before || 0) <= after ? 'rotate-0' : 'rotate-180']"
    width="8"
    height="20"
    viewBox="0 0 8 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.35355 0.646447C4.15829 0.451184 3.84171 0.451184 3.64645 0.646447L0.464465 3.82843C0.269203 4.02369 0.269203 4.34027 0.464465 4.53553C0.659728 4.7308 0.97631 4.7308 1.17157 4.53553L4 1.70711L6.82843 4.53553C7.02369 4.7308 7.34027 4.7308 7.53553 4.53553C7.7308 4.34027 7.7308 4.02369 7.53553 3.82843L4.35355 0.646447ZM4.5 20L4.5 1L3.5 1L3.5 20L4.5 20Z"
      :fill="(before || 0) <= after ? '#18B700' : 'red'"
    />
  </svg>
</template>
