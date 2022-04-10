<script setup lang="ts">import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { getImageUrl } from '../types/recipe'

const props = defineProps({
    username: String
})

const getUserQuery = gql`
query MyQuery($user: String) {
  users(where: {name: {_eq: $user}}) {
    name
    recipes {
      id
      name
      image
      description
    }
  }
}`

const { result, loading, error } = useQuery(getUserQuery, {
    user: props.username
})


</script>

<template>
    <p v-if="loading">user info {{ props.username }}</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="result">
        <h1>User profile for: {{ result.users[0].name }}</h1>
        <p>created recipes:</p>
        <!-- {{result}} -->

        <router-link
            v-for="recipe of result.users[0].recipes"
            :key="recipe.id"
            class="flex items-center m-5 space-x-5"
            :to="'/recipe/' + recipe.id"
        >
            <img class="max-w-[100px]" :src="getImageUrl(recipe.image, 100, 100)" />
            <span>
                <h3 class="text-2xl">{{ recipe.name }}</h3>
                <p class="text-l">{{ recipe.description }}</p>
            </span>
        </router-link>
    </div>
</template>