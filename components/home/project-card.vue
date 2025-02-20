<script setup lang="ts">
import { ProjectType, type Project } from "~/types/all";
const toast = useToast();

const props = defineProps<{
  project: Project;
  index: number;
  screen: "mobile" | "desktop";
}>();

const isEven = props.index % 2 == 0;
</script>
<template>
  <div
    :class="[
      'flex flex-col rounded-[1vw]',
      { 'bg-white': isEven },
      { 'text-black': isEven },
      { 'border-D p-D-20 gap-D-22 w-D-405': screen == 'desktop' },
      { 'border-M w-full gap-M-19 p-M-20': screen == 'mobile' },
    ]"
  >
    <div class="flex items-center justify-between">
      <div
        :class="[
          'text-center',
          isEven ? 'border-black' : 'border-white',
          { 'border-D rounded-[.3vw] text-D-12 w-D-50': screen == 'desktop' },
          { 'border-M rounded-[2vw] text-M-12 w-M-50': screen == 'mobile' },
        ]"
      >
        {{ ProjectType[props.project.type] }}
      </div>
      <NuxtImg
        :class="[
          'on-hover',
          { 'w-D-30': screen == 'desktop' },
          { 'w-M-30': screen == 'mobile' },
        ]"
        @click="toast.add({ title: 'Soon!)' })"
        src="images/home/arrow-white-link.svg"
      />
    </div>

    <div
      :class="[
        'flex items-start',
        { 'gap-D-19': screen == 'desktop' },
        { 'gap-M-7': screen == 'mobile' },
      ]"
    >
      <NuxtImg
        :class="[
          { 'w-D-48': screen == 'desktop' },
          { 'w-M-34': screen == 'mobile' },
        ]"
        src="images/home/avatar.svg"
      />
      <div class="flex flex-col">
        <p
          :class="[
            'font-bold',
            { 'mb-D-2 text-D-24': screen == 'desktop' },
            { 'mb-M-2 text-M-17': screen == 'mobile' },
          ]"
        >
          {{ project.title.toUpperCase() }}
        </p>

        <div
          :class="[
            'flex',
            { 'gap-D-4 mb-D-16': screen == 'desktop' },
            { 'gap-M-4 mb-M-16': screen == 'mobile' },
          ]"
        >
          <p
            :class="[
              'font-bold text-[#FFE72E]',
              { 'text-D-14': screen == 'desktop' },
              { 'text-M-14': screen == 'mobile' },
            ]"
          >
            {{ project.starsAmount }}
          </p>
          <NuxtImg
            :class="[
              { 'w-D-20': screen == 'desktop' },
              { 'w-M-20': screen == 'mobile' },
            ]"
            src="images/home/star.svg"
          />
        </div>

        <p
          :class="[
            { 'text-D-18 leading-D-27': screen == 'desktop' },
            { 'text-M-14 leading-M-21': screen == 'mobile' },
          ]"
        >
          {{ project.text }}
        </p>
      </div>
    </div>
  </div>
</template>
