<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from './auth/useAuthService'

import NavBarVue from './components/NavBar.vue';


// You can import 'loading' here and show a global loader if that's more convenient 
const { initializeAuth } = useAuth();

onMounted(() => {
  initializeAuth({
    domain: import.meta.env.VITE_APP_AUTH0_DOMAIN as string,
    client_id: import.meta.env.VITE_APP_AUTH0_CLIENT_ID as string,
    audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE as string
  })
}
);
</script>

<template>
  <main>
    <NavBarVue></NavBarVue>
    <router-view />
  </main>
</template>

<style></style>
