<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { getImageUrl } from '../types/recipe'
import { GetAllRecipes } from '../generated/graphql.d'
import { parseAllRecipesResult } from '../gql/queryHelper'
import { computed } from 'vue'

const { result } = useQuery(GetAllRecipes)
const parsedRecipes = computed(() => result.value ? parseAllRecipesResult(result.value.recipes) : null)

const dietStyle = new Map([
    [ "vegan", "text-green-500" ],
    [ "vegetarian", "text-emerald-500" ],
    [ "fish", "text-blue-600" ],
    [ "meat", "text-red-600" ]
]);

</script>

<template>
  <div class="flex min-h-full flex-col container mx-auto">
    <div class="my-10 mb-52 flex mx-auto">
      <p v-if="!parsedRecipes">Loading...</p>
      <div v-if="parsedRecipes">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="recipe of parsedRecipes"
            :key="recipe.id"
            class="max-w-[250px] bg-white rounded-lg border border-gray-200 shadow-md"
          >
            <router-link :to="'/recipe/' + recipe.id">
              <img class="rounded-t-lg" :src="getImageUrl((recipe.image ?? ''), 250, 200)" />
            </router-link>
            <div class="p-5">
              <router-link :to="'/recipe/' + recipe.id">
                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">{{ recipe.name }}</h5>
              </router-link>
              <p class="font-normal text-sm text-gray-700">{{ recipe.description }}</p>
              <p v-if="recipe.diet" class="mb-2 font-normal text-sm float-right" :class="dietStyle.get(recipe.diet)" >{{ recipe.diet }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
