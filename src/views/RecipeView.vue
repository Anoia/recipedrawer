<script setup lang="ts">

import { useMutation, useQuery } from '@vue/apollo-composable'
import { getImageUrl } from '../types/recipe'
import { computed } from 'vue'
import { useAuth } from '../auth/useAuthService'
import { DeleteRecipeMutationVariables, GetRecipeById, GetRecipeByIdQueryVariables, DeleteRecipe, CreateNewIngredient } from '../generated/graphql.d'
import { parseGetRecipeByIdResult } from '../gql/queryHelper'
import { useRouter } from 'vue-router'

const props = defineProps<{
    id: number
}>()

const router = useRouter()

let queryVariables: GetRecipeByIdQueryVariables = { id: props.id }

const { result, refetch } = useQuery(GetRecipeById, queryVariables, { fetchPolicy: 'cache-and-network' })

const parsedResult = computed(() => (result.value) ? parseGetRecipeByIdResult(result.value.recipes_by_pk) : null)

const imageUrl = computed(() => {
    if (parsedResult.value) {
        return getImageUrl(parsedResult.value.image, 200, 200)
    } else return 'https://via.placeholder.com/200'
})

const { user: loggedInUser } = useAuth();

const isAuthor = computed(() => result?.value.recipes_by_pk.user.name == loggedInUser?.value?.['https://recipedrawer.herokuapp.com/username'])
const recipeAsIngredient = computed(() => (result?.value.recipes_by_pk.ingredients.length > 0) ? result.value.recipes_by_pk.ingredients[0] : undefined)   // has name, id


const { mutate: createIngredient, onDone: IngredientCreateDone } = useMutation(CreateNewIngredient, () => ({   //todo reload on done
    variables: {
        name: parsedResult.value?.name,
        diet: parsedResult.value?.diet,
        recipe_id: props.id
    },
}))

IngredientCreateDone(() => refetch())


let variables: DeleteRecipeMutationVariables = { id: props.id }
const { mutate, onDone } = useMutation(DeleteRecipe, () => ({
    variables: variables
}))

function deleteRecipe() {
    console.log('starting delte')

    mutate()

}
onDone(r => {
    console.log(`deleted ${r}`)
    router.push(`/`)
})

</script>

<template>
    <div>
        <p v-if="!parsedResult">Loading..</p>
        <div v-if="parsedResult" class="container mx-auto max-w-4xl">
            <div class="flex flex-col sm:flex-row">
                <img class="m-5 max-w-[200px]" :src="imageUrl" />
                <div class="flex flex-col flex-grow m-5">
                    <h2 class="mt-10 text-3xl font-bold text-slate-800">{{ parsedResult.name }}</h2>
                    <p class="grow my-3">{{ parsedResult.description }}</p>

                    <p>{{ parsedResult.portions }} Portions</p>
                    <p>
                        <span v-if="parsedResult.prepTime">{{ parsedResult.prepTime }} prep time</span>
                        <span v-if="parsedResult.prepTime && parsedResult.cookingTime">{{ `, ` }}</span>
                        <span
                            v-if="parsedResult.cookingTime"
                        >{{ parsedResult.cookingTime }} total time</span>
                    </p>
                    <p>Diet: {{ parsedResult.diet }}</p>
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
                    <ul class="my-3">
                        <li
                            v-for="i in parsedResult.recipeIngredients"
                            class="border-b-[1px] last:border-b-0 p-1 py-2 border-slate-300"
                            :class="(i.type === 'section') ? `bg-slate-200` : ``"
                        >
                            <span v-if="i.type === 'ingredient'">
                                {{ i.amount }} {{ i.unit.short_name }}
                                <router-link :to="'/ingredient/' + i.ingredient_id">{{ i.name }}</router-link>
                            </span>
                            <span v-if="i.type === 'section'" class="font-semibold">{{ i.name }}</span>
                        </li>
                    </ul>
                </div>
                <div class="basis-2/3 m-5">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Directions</h3>
                    <div v-for="step in parsedResult.steps">
                        <div v-if="step.content" class="flex my-5">
                            <span class="text-3xl p-1 pr-4 text-slate-500">{{ step.id }}</span>
                            <p>{{ step.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isAuthor" class="flex-row">
                <a
                    class="hover:underline float-left my-10 ml-5 text-red-700 cursor-pointer"
                    @click="deleteRecipe"
                >Delete Recipe</a>
            </div>
            <div v-if="isAuthor" class="flex-row">
                <router-link
                    :to="'/edit/' + props.id"
                    class="hover:underline m-10 float-right text-teal-500"
                >Edit Recipe</router-link>
            </div>
            <div v-if="isAuthor" class="flex-row">
                <router-link
                    v-if="recipeAsIngredient"
                    :to="'/ingredient/' + recipeAsIngredient.id"
                    class="hover:underline m-10 float-right text-teal-500"
                >Available as Ingredient: {{ recipeAsIngredient.name }}</router-link>
                <button
                    v-if="!recipeAsIngredient"
                    @click="createIngredient()"
                    class="hover:underline m-10 float-right text-teal-500"
                >Create Ingredient from Recipe</button>
            </div>
        </div>
    </div>
</template>