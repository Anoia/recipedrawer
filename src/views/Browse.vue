<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { getImageUrl } from '../types/recipe'
import { Recipes, Search, SearchQueryVariables } from '../generated/graphql.d'
import { parseAllRecipesResult } from '../gql/queryHelper'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { RefreshIcon } from '@heroicons/vue/outline'


const searchterm = ref('')
const queryVars: ComputedRef<SearchQueryVariables> = computed(() => {
  return { searchterm: `%${searchterm.value}%` }
})

const { onResult, loading } = useQuery(Search, queryVars)

const parsedRecipes: Ref<Recipes[]> = ref([])

onResult((result) => {
  if (result.data) {
    parsedRecipes.value = parseAllRecipesResult(result.data.recipes)
  }
})

</script>

<template>
  <div class="flex min-h-full flex-col container mx-auto">
    <span class="mx-auto flex flex-row items-baseline">
      <label class>Search for Recipe:</label>
      <input class="grow m-3" v-model="searchterm" type="text" />
      <RefreshIcon v-if="loading" class="h-4 w-4 text-slate-500" />
      <RefreshIcon v-if="!loading" class="invisible h-4 w-4 text-slate-500" />
    </span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
