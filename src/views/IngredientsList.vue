<script setup lang="ts">import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { getImageUrl } from '../types/recipe'

const getIngredients = gql`
query GetIngredientsList{
  ingredients {
    id
    name
  }
}`

const { result, loading, error } = useQuery(getIngredients)


</script>

<template>
    <p v-if="loading">ingredient list</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="result">
        <p>Ingredients:</p>
        <!-- {{result}} -->

        <router-link
            v-for="i of result.ingredients"
            :key="i.id"
            class="flex items-center m-5 space-x-5"
            :to="'/ingredient/' + i.id"
        >
            <!-- <img class="max-w-[50px]" src="https://via.placeholder.com/50" /> -->
            <span>
                <h3 class="text-lg">{{ i.name }}</h3>
                <!-- <p class="text-l">{{ recipe.recipe.description }}</p> -->
            </span>
        </router-link>
    </div>
</template>