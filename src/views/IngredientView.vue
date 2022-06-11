<script setup lang="ts">import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';
import { getImageUrl } from '../types/recipe'

const props = defineProps({
  id: String
})

const getIngredient = gql`
query Ingredient($id: Int!) {
  ingredients_by_pk(id: $id) {
    id
    name
    diet
    recipe_id
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

const updateIngredientDiet = gql`
mutation editdiet($id: Int! , $diet:String) {
  update_ingredients_by_pk(pk_columns: {id: $id}, _set: {diet: $diet}) {
    diet
    name
  }
}`
const { mutate: updateDietMutation, onDone } = useMutation(updateIngredientDiet, () => ({
  variables: {
    id: props.id,
    diet: editingDiet.value
  }
}))

onDone(result => {
  console.log(result.data)
  editing.value = false
  refetch()
})

const { result, loading, error, refetch } = useQuery(getIngredient, {
  id: props.id
})

const editing = ref(false)
const editingDiet = ref(result?.value?.ingredients_by_pk?.diet ?? 'vegan')

</script>

<template>
  <p v-if="loading">ingredient info for ${{ props.id }}</p>
  <p v-if="error">{{ error }}</p>
  <div v-if="result">
    <h1>Ingredient: {{ result.ingredients_by_pk.name }}</h1>
    <p v-if="result.ingredients_by_pk.diet">diet is {{ result.ingredients_by_pk.diet }}</p>
    <p v-if="!result.ingredients_by_pk.diet">diet is not set!</p>
    <button class="bg-slate-200 m-2 p-2" @click="editing = !editing">edit diet</button>
    <div v-if="editing">
      <div class="flex">
        <div class="flex">
          <div class="flex items-center mr-4">
            <input
              type="radio"
              id="vegan"
              name="diet"
              value="vegan"
              v-model="editingDiet"
              class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-1"
            />
            <label for="vegan" class="ml-2 text-sm font-medium text-teal-600">vegan</label>
          </div>

          <div class="flex items-center mr-4">
            <input
              type="radio"
              id="vegetarian"
              name="diet"
              value="vegetarian"
              v-model="editingDiet"
              class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-1"
            />
            <label for="vegetarian" class="ml-2 text-sm font-medium text-teal-600">vegetarian</label>
          </div>

          <div class="flex items-center mr-4">
            <input
              type="radio"
              id="fish"
              name="diet"
              value="fish"
              v-model="editingDiet"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
            />
            <label for="fish" class="ml-2 text-sm font-medium text-blue-600">fish</label>
          </div>

          <div class="flex items-center mr-4">
            <input
              type="radio"
              id="meat"
              name="diet"
              value="meat"
              v-model="editingDiet"
              class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-1"
            />
            <label for="meat" class="ml-2 text-sm font-medium text-red-600">meat</label>
          </div>
        </div>
      </div>
      <button class="bg-slate-200 m-2 p-2" @click="updateDietMutation()">save</button>
    </div>
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