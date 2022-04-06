<script setup lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useAuth } from './auth/useAuthService'
import { useRouter } from 'vue-router';


// You can import 'loading' here and show a global loader if that's more convenient 
const { initializeAuth } = useAuth();

console.log(import.meta.env.VITE_APP_AUTH0_DOMAIN)
console.log(import.meta.env.BASE_URL)
console.log(import.meta.env.MODE)

onMounted(() => {
  initializeAuth({
    domain: import.meta.env.VITE_APP_AUTH0_DOMAIN as string,
    client_id: import.meta.env.VITE_APP_AUTH0_CLIENT_ID as string,
    audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE as string
  })
}
);

    const {loginWithRedirect, logout, isAuthenticated, loading, user} = useAuth();
    const {push} = useRouter();

    const logoutAndRedirect = () => {
      logout();
      push({ path: "/" });
    }

    const login = () => loginWithRedirect();



</script>

<template>
  <main>
    <router-view />
    <p>text</p>
    <p>{{isAuthenticated}}</p>
    <p>{{ user?.name }}</p>
    <button @click="login">Log in</button>
  </main>
</template>

<style></style>
