<script setup lang="ts">

import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { getRecipeQuery, parseGetRecipeQueryResult } from '../gql/queries'
import { EditableRecipe, getImageUrl } from '../types/recipe'
import { Ref, ref, ComputedRef, computed } from 'vue'
import { useAuth } from '../auth/useAuthService'

const props = defineProps({
    id: String
})

const { result } = useQuery(getRecipeQuery, {
    id: props.id, 
  fetchPolicy: 'cache-and-network',

})


const recipeToView: ComputedRef<EditableRecipe | undefined> = computed(() => 
  {  if(result.value){
           return parseGetRecipeQueryResult(result.value)
    }else{
       return undefined
    }}
)

const imageUrl = computed(() => {
    if(recipeToView.value){
       return getImageUrl(recipeToView.value.image, 200, 200) 
    }else return 'https://via.placeholder.com/200'
})

const {user:loggedInUser} = useAuth();

</script>

<template>
    <div>
        <p v-if="!recipeToView">Loading..</p>
        <div v-if="recipeToView" class="container mx-auto max-w-4xl">
            <div class="flex flex-col sm:flex-row">
                <img class="m-5 max-w-[200px]" :src="imageUrl" />
                <div class="flex flex-col flex-grow m-5">
                    <h2
                        class="mt-10 text-3xl font-bold text-slate-800"
                    >{{ recipeToView.name }}</h2>
                    <p class="grow my-3">{{ recipeToView.description }}</p>
                    <p class="relative bottom-0 grow-0 text-slate-500 text-right">
                        written by
                        <router-link  
                            :to="'/user/' + result?.recipes_by_pk.user.name" 
                            class="hover:underline"
                        >{{ result?.recipes_by_pk.user.name }}</router-link>   <!-- TODO -->
                    </p>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row">
                <div class="basis-1/3 m-5 border-slate-400">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Ingredients</h3>
                    <ul class="my-3 space-y-1">
                        <li
                            v-for="i in recipeToView.recipeIngredients"
                            class="border-b-[1px] last:border-b-0 p-1 border-slate-300"
                        >{{ i.amount }} {{ i.unit.short_name }} {{ i.name }}</li>
                    </ul>
                </div>
                <div class="basis-2/3 m-5">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Directions</h3>
                    <div v-for="step in recipeToView.steps">
                        <div v-if="step.content" class="flex my-5">
                            <span class="text-3xl p-1 pr-4 text-slate-500">{{ step.id }}</span>
                            <p>{{ step.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="result?.recipes_by_pk.user.name == loggedInUser?.['https://recipedrawer.herokuapp.com/username']" class="flex-row">
                <router-link
                    :to="'/edit/' + props.id"
                    class="hover:underline m-10 float-right text-slate-500"
                >Edit Recipe</router-link>
            </div>
        </div>
    </div>
</template>