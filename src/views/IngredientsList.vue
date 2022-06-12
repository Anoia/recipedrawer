<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, ComputedRef, ref } from 'vue';
import fuzzysort from 'fuzzysort'

const getIngredients = gql`
query listIngredients {
  ingredients(order_by: {recipe_ingredients_aggregate: {count: desc}}) {
    id
    name
    diet
    recipe_ingredients_aggregate {
      aggregate {
        count(distinct: true, columns: recipe_id)
      }
    }
  }
}`

const { result, loading, error } = useQuery(getIngredients)

const ingredientListFilter = ref('')
const fuzzyIngredients: ComputedRef<any> = computed(() => fuzzysort.go(ingredientListFilter.value, result.value.ingredients, { key: 'name', all: true }))


</script>

<template>
    <p v-if="loading">ingredient list</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="result" class="container mx-auto">
        <p class="text-2xl my-8">Ingredients</p>
        <div class="m-3">
            <label>Filter:</label>
            <input type="text" v-model="ingredientListFilter" />
        </div>
        <table class="shadow-md rounded">
            <thead>
                <tr class="bg-slate-200">
                    <th class="p-4 text-left font-bold">Name</th>
                    <th class="p-4 text-left font-bold">Recipes</th>
                    <th class="p-4 text-left font-bold">Diet</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-300">
                <tr v-for="i of fuzzyIngredients" :key="i.obj.id" class="hover:bg-slate-100">
                    <td class="p-4">
                        <router-link :to="'/ingredient/' + i.obj.id">{{ i.obj.name }}</router-link>
                    </td>
                    <td
                        class="p-4 text-right"
                    >{{ i.obj.recipe_ingredients_aggregate.aggregate.count ? i.obj.recipe_ingredients_aggregate.aggregate.count : `-` }}</td>
                    <td class="p-4 text-right">{{ i.diet }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>