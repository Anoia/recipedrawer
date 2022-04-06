<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useAuth } from '../auth/useAuthService'

const { loginWithRedirect, logout, isAuthenticated, loading, user } = useAuth();
const { push } = useRouter();

const logoutAndRedirect = () => {
    logout();
    push({ path: "/" });
}

const login = () => loginWithRedirect();

</script>

<template>
    <header class="flex bg-slate-500 items-center text-white">
        <router-link to="/" class="px-10 my-7 font-serif text-3xl grow drop-shadow-md">Cookbook</router-link>
        <router-link to="/browse" class="mx-2 grow-0">Browse</router-link>
        <p>|</p>
        <router-link to="/create" class="mx-2 grow-0">Create</router-link>

        <span v-if="isAuthenticated" class="flex mx-5 items-center">
            <span class="flex flex-col items-end">
                <p>Moin</p>
                <p>{{ user?.nickname }}!</p>
                <button
                    class="underline font-normal text-sm hover:text-slate-200"
                    @click="logoutAndRedirect"
                >Log out</button>
            </span>

            <img :src="user?.picture" class="w-12 h-12 ml-4" />
        </span>

        <button
            v-if="!isAuthenticated"
            class="mx-5 underline hover:text-slate-200"
            @click="login"
        >Log in</button>
    </header>
</template>