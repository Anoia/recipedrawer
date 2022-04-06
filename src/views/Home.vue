<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="flex min-h-full flex-col items-center justify-center">
    <button
      @click="count++"
      class="rounded-md border bg-emerald-600 py-1 px-3 text-sm font-medium text-white hover:bg-emerald-500"
    >Count: {{ count }}</button>
    <HelloWorld msg="Vite + Vue 3 + Typescript + Tailwind 3 + Vue Rounter 4" />
    <div class="mt-10 inline-flex rounded-md shadow">
      <router-link
        to="/about"
        class="inline-flex items-center justify-center rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-slate-500 focus:outline-none"
      >Next Page</router-link>
      <router-link
        to="/cookbook"
        class="inline-flex items-center justify-center rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-slate-500 focus:outline-none"
      >CookBook</router-link>
    </div>
  </div>
</template>
