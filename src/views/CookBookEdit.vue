<script setup lang="ts">

import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ComputedRef, watch, ref, Ref, nextTick, onMounted } from 'vue'
import IngredientSelectorVue from '../components/IngredientSelector.vue'
import {Unit} from '../components/IngredientSelector.vue'


const props = defineProps({
    id: String
})

interface Ingredient {
    id: string,
    name: string,
    amount: number,
    unit:Unit
}

interface Step {
    id: string,
    content: string
}

interface EditableRecipe {
    name: string,
    description: string,
    steps: Step[],
    recipeIngredients: Ingredient[]
}

const { result, loading, error } = useQuery(gql`
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
                id
                long_name
                short_name
              }
            }
          }
        }
      `, {
    id: props.id
})

onMounted(() => handleInit(result.value, loading.value))

watch([result, loading], async ([newResult, newLoading]) => {
    console.log(`watching, ${newResult} ${newLoading}`)
    handleInit(newResult, newLoading)
})


function handleInit(newResult:any, newLoading:boolean) {
        if (props.id && newResult) {
        let r = newResult.recipes_by_pk
        recipeToEdit.value = {
            name: r.name,
            description: r.description,
            steps: r.steps.map((s: any) => {
                return { id: s.id, content: s.content }
            }),
            recipeIngredients: r.recipe_ingredients.map((item: any) => {
                return {
                    id: item.ingredient.id,
                    name: item.ingredient.name,
                    amount: item.amount,
                    unit:item.unitByUnit
                }
            })
        }
        nextTick(() => resizeAllTextAreas())
    } else if (!props.id || !newLoading) {
        recipeToEdit.value = {
            name: "new name",
            description: "new desc",
            steps: [],
            recipeIngredients: []
        }
        nextTick(() => resizeAllTextAreas())

    }
}

const recipeToEdit: Ref<EditableRecipe | undefined> = ref(undefined)


const stepRefs = ref<any[]>([])


function addNewStep() {
    const newId = (recipeToEdit?.value?.steps.length) ?? 0
    console.log("NEW ID: " + newId)
    recipeToEdit?.value?.steps.push({ id: (recipeToEdit?.value?.steps.length + 1)?.toString(10), content: "newcontent" })

    nextTick(() => {
        let newStep = stepRefs.value[newId]
        resizeTextArea(newStep)
        newStep.focus()
    })
}

function resizeTextArea(elem: any) {
    elem.style.height = "auto";
    elem.style.height = `${elem.scrollHeight}px`;
}

function testEvent(event: any) {
    resizeTextArea(event.target)
}

function resizeAllTextAreas() {
    for (let s of stepRefs.value) {
        resizeTextArea(s)
    }
}


const { mutate } = useMutation(gql`
  mutation edit ($rid: Int!, $nin: [Int!]!, $inputtest: [recipe_ingredients_insert_input!]!, $description: String, $name: String , $steps: jsonb, $image: String = "") {
    update_recipes_by_pk(pk_columns: {id: $rid}, _set: {image: $image, name: $name, description: $description, steps: $steps}) {
        id
    }
    insert_recipe_ingredients(objects: $inputtest, on_conflict: {constraint: recipe_ingredients_pkey, update_columns: [amount, unit]}) {
        affected_rows
    }
    delete_recipe_ingredients(where: {recipe_id: {_eq: $rid}, ingredient_id: {_nin: $nin}}) {
        affected_rows
    }
  }
`, () => ({
  variables: {
    rid: props.id,
    nin:recipeToEdit.value?.recipeIngredients.map(i=> i.id),
    inputtest:recipeToEdit.value?.recipeIngredients.map(i=> {return {
        ingredient_id: i.id,
        recipe_id: props.id, 
        unit:i.unit.id,
        amount: i.amount
    }}),
    description: recipeToEdit.value?.description,
    name: recipeToEdit.value?.name,
    steps: recipeToEdit.value?.steps
  },
}))

function clickHandler(){
    mutate()

}

</script>

<template>
    <div>
        <p v-if="error">Error: {{ error }}</p>
        <p v-if="!recipeToEdit">Loading..</p>
        <div v-if="recipeToEdit" class="container mx-auto max-w-4xl">
            <div class="flex flex-row">
                <img class="m-5 max-w-[200px]" src="https://via.placeholder.com/200" />
                <div class="flex flex-col flex-grow m-5">
                    <input
                        type="text"
                        v-model="recipeToEdit.name"
                        placeholder="Recipe title"
                        class="mt-10 text-3xl font-bold focus:ring-0  text-slate-800 border-2 border-white focus:border-slate-400 hover:focus:border-solid hover:border-dashed hover:border-slate-400"
                    />
                    <input type="text" placeholder="description" class="grow my-3 focus:ring-0  text-slate-800 border-2 border-white focus:border-slate-400 hover:focus:border-solid hover:border-dashed hover:border-slate-400" v-model="recipeToEdit.description" />
                    <p class="relative bottom-0 grow-0 text-slate-500 text-right">written by me</p>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row">
                <div class="basis-1/3 m-5 border-slate-400">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Ingredients</h3>
                    <ul class="my-3 space-y-1">
                        <li
                            v-for="i in recipeToEdit?.recipeIngredients"
                            class="border-b-[1px] last:border-b-0 p-1 border-slate-300"
                        >{{ i.amount }} {{ i.unit.short_name }} {{ i.name }}</li>
                        <li>
                            <IngredientSelectorVue
                                :add-ingredient="(name, id, amount, unit) => recipeToEdit?.recipeIngredients.push({
                                    name: name,
                                    id: id,
                                    amount: amount,
                                    unit:unit
                                })"
                            ></IngredientSelectorVue>
                        </li>
                    </ul>
                </div>
                <div class="basis-2/3 m-5">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Directions</h3>
                    <div v-for="(step, i) in recipeToEdit?.steps" class="flex my-5">
                        <span class="text-3xl p-1 pr-4 text-slate-500">{{ step.id }}</span>
                        <textarea
                            :ref="el => { stepRefs[i] = el }"
                            type="text"
                            v-model="step.content"
                            @input="testEvent"
                            class="h-8 overflow-hidden resize-none grow border-2 border-white focus:border-slate-400 hover:focus:border-solid focus:ring-0 hover:border-dashed hover:border-slate-400"
                        />
                    </div>
                    <div class="flex my-5">
                        <button @click="addNewStep">add new</button>
                    </div>
                </div>
            </div>
            <div>
                <button @click="clickHandler">KLICK</button>
            </div>
        </div>
    </div>
</template>