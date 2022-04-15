<script setup lang="ts">
import { useRouter } from 'vue-router';
import { watch, inject } from 'vue'
import { useAuth } from '../auth/useAuthService'
import { DefaultApolloClient, } from '@vue/apollo-composable'
import { ApolloClient, NormalizedCacheObject, createHttpLink } from '@apollo/client/core';

const { loginWithRedirect, logout, isAuthenticated, user, getTokenSilently, checkSession } = useAuth();
const { push } = useRouter();

const logoutAndRedirect = () => {
    logout({returnTo: window.location.origin});
    push({ path: "/" });
}

const login = () => loginWithRedirect();

const actualClient = inject(DefaultApolloClient) as ApolloClient<NormalizedCacheObject>

watch(isAuthenticated, (newAuth, oldAuth) => {
    if (newAuth && !oldAuth) {
        getTokenSilently().then(token => {
        console.log(user.value)
            const httpLink = createHttpLink({
                uri: import.meta.env.VITE_APP_GRAPHQL_HTTP as string,
                headers: {
                    authorization: "Bearer " + token
                },
            })
            actualClient.setLink(httpLink)
        })
    }
})

</script>

<template>
    <header class="flex bg-slate-500 items-center text-white">
        <router-link to="/" class="px-10 my-7 font-serif text-3xl grow drop-shadow-md">Recipe Drawer</router-link>
        <router-link to="/browse" class="mx-2 grow-0">Browse Recipes</router-link>
        <p>|</p>
         <router-link to="/ingredients" class="mx-2 grow-0">Browse Ingredients</router-link>
        <p v-if="isAuthenticated">|</p>
        <router-link v-if="isAuthenticated" to="/create" class="mx-2 grow-0">Create</router-link>
        <p>|</p>
        <router-link to="/about" class="mx-2 grow-0">About</router-link>

        <span v-if="isAuthenticated" class="flex mx-5 items-center">
            <span class="flex flex-col items-end">
                <p>Moin</p>
                <p>{{ user?.["https://recipedrawer.herokuapp.com/username"] }}!</p>
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