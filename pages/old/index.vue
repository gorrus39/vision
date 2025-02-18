<script setup lang="ts">

// import { useLogger } from '@nuxt/kit';

// import { useLogger } from 'nuxt/kit';


// import { defineNuxtModule, useLogger } from '@nuxt/kit'

// export default defineNuxtModule({
//   setup(options, nuxt) {
//     const logger = useLogger('my-module')

//     logger.info('Hello from my module!')
//   }
// })
// const logger = useLogger()
// logger.info('sadf')

const timer = ref(15)



onMounted(() => {

  setInterval(() => {
    timer.value = timer.value - 1
  }, 1000)
})


watch(timer, value => {
  if (value === 0) {
    alert('asdf')
    throw new Error("sadf");
  }
})


</script>

<template>
  <div>
    <UCarousel />
    Page: home
    {{ timer }}
  </div>
  <NuxtImg src="fds" alt="asdf" />
</template>

<style scoped></style>
