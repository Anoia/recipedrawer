<script setup lang="ts">

import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const props = defineProps({
    id: String
})

const { result } = useQuery(gql`
        query get_recipe($id: Int!) {
          recipes_by_pk(id: $id) {
            id
            name
            description
            steps
            user {
              name
            }
            recipe_ingredients {
              amount
              ingredient {
                id
                name
              }
              unitByUnit {
                long_name
                short_name
              }
            }
          }
        }
      `, {
    id: props.id
})
</script>

<template>
    <div>
        <p v-if="!result">Loading..</p>
        <div v-if="result" class="container mx-auto max-w-4xl">
            <div class="flex flex-row">
                <img class="m-5 max-w-[200px]" src="https://via.placeholder.com/200" />
                <div class="flex flex-col flex-grow m-5">
                    <h2
                        class="mt-10 text-3xl font-bold text-slate-800"
                    >{{ result?.recipes_by_pk.name }}</h2>
                    <p class="grow my-3">{{ result?.recipes_by_pk.description }}</p>
                    <p class="relative bottom-0 grow-0 text-slate-500 text-right">
                        written by
                        <router-link
                            :to="'/user/' + result?.recipes_by_pk.user.name"
                            class="hover:underline"
                        >{{ result?.recipes_by_pk.user.name }}</router-link>
                    </p>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row">
                <div class="basis-1/3 m-5 border-slate-400">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Ingredients</h3>
                    <ul class="my-3 space-y-1">
                        <li
                            v-for="i in result?.recipes_by_pk.recipe_ingredients"
                            class="border-b-[1px] last:border-b-0 p-1 border-slate-300"
                        >{{ i.amount }} {{ i.unitByUnit.short_name }} {{ i.ingredient.name }}</li>
                    </ul>
                </div>
                <div class="basis-2/3 m-5">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Directions</h3>
                    <div v-for="step in result?.recipes_by_pk.steps">
                        <div v-if="step.content" class="flex my-5">
                            <span class="text-3xl p-1 pr-4 text-slate-500">{{ step.id }}</span>
                            <p>{{ step.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-row">
                <router-link
                    :to="'/cookbookedit/' + props.id"
                    class="hover:underline m-10 float-right text-slate-500"
                >Edit Recipe</router-link>
            </div>
        </div>
    </div>
</template>