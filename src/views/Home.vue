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
    <div class="rounded-md shadow my-10 mb-52">
      <p v-if="!parsedRecipes">Loading...</p>
      <div v-if="parsedRecipes">
        <router-link
          v-for="recipe of parsedRecipes"
          :key="recipe.id"
          class="flex items-center m-5 space-x-5"
          :to="'/recipe/' + recipe.id"
        >
          <img class="max-w-[100px]" :src="getImageUrl((recipe.image??''), 100, 100)" />
          <span>
            <h3 class="text-2xl">{{ recipe.name }}</h3>
            <p class="text-l">{{ recipe.description }}</p>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
