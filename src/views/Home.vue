<script setup lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable'
import { getImageUrl } from '../types/recipe'
import {GetAllRecipes} from '../generated/graphql.d'
import {parseAllRecipesResult} from '../gql/queryHelper'

const { result } = useQuery(GetAllRecipes)
const parsedRecipes = useResult(result, null, data => parseAllRecipesResult(data.recipes))

</script>

<template>
  <div class="flex min-h-full flex-col container mx-auto max-w-4xl">
    <div class="my-10 mb-52">
      <p v-if="!parsedRecipes">Loading...</p>
      <div v-if="parsedRecipes">

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">

<div v-for="recipe of parsedRecipes"
          :key="recipe.id"  class="max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <router-link
          
          :to="'/recipe/' + recipe.id">
        <img class="rounded-t-lg" :src="getImageUrl((recipe.image??''), 350, 300)" alt="" />
    </router-link>
    <div class="p-5">
        <router-link
          :to="'/recipe/' + recipe.id">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ recipe.name }}</h5>
        </router-link>
        <p class="font-normal text-gray-700 dark:text-gray-400">{{ recipe.description }}</p>
    </div>
</div>
</div>

    
      </div>
    </div>
  </div>
</template>
