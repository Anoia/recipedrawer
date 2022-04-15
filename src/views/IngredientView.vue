<script setup lang="ts">import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { getImageUrl } from '../types/recipe'

const props = defineProps({
    id: String
})

const getIngredient = gql`
query Ingredient($id: Int!) {
  ingredients_by_pk(id: $id) {
    id
    name
    recipe_ingredients {
      recipe {
        id
        image
        name
        description
      }
    }
  }
}`

const { result, loading, error } = useQuery(getIngredient, {
    id: props.id
})


</script>

<template>
    <p v-if="loading">ingredient info for ${{ props.id }}</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="result">
        <h1>Ingredient: {{ result.ingredients_by_pk.name }}</h1>
        <p>created recipes:</p>
        <!-- {{result}} -->

        <router-link
            v-for="recipe of result.ingredients_by_pk.recipe_ingredients"
            :key="recipe.recipe.id"
            class="flex items-center m-5 space-x-5"
            :to="'/recipe/' + recipe.recipe.id"
        >
            <img class="max-w-[100px]" :src="getImageUrl(recipe.recipe.image, 100, 100)" />
            <span>
                <h3 class="text-2xl">{{ recipe.recipe.name }}</h3>
                <p class="text-l">{{ recipe.recipe.description }}</p>
            </span>
        </router-link>
    </div>
</template>