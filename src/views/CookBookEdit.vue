<script setup lang="ts">

import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ComputedRef, watch, ref, Ref, nextTick, onMounted } from 'vue'
import IngredientSelectorVue from '../components/IngredientSelector.vue'
import { Unit, Ingredient, Step, EditableRecipe, emptyRecipe } from '../types/recipe'
import { getRecipeQuery, parseGetRecipeQueryResult, createRecipeMutation, editRecipeMutation } from '../gql/queries'

import { TrashIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/outline'

const props = defineProps({
    id: String
})



const { result, loading, error } = useQuery(getRecipeQuery, {
    id: props.id
})

onMounted(() => handleInit(result.value, loading.value))

watch([result, loading], async ([newResult, newLoading]) => {
    console.log(`watching, ${newResult} ${newLoading}`)
    handleInit(newResult, newLoading)
})


function handleInit(newResult: any, newLoading: boolean) {
    if (props.id && newResult) {
        recipeToEdit.value = parseGetRecipeQueryResult(newResult)
    } else if (!props.id || !newLoading) {
        recipeToEdit.value = emptyRecipe
    }
    nextTick(() => resizeAllTextAreas())
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


const { mutate: newMutatename } = useMutation(editRecipeMutation, () => ({
    variables: {
        rid: props.id,
        nin: recipeToEdit.value?.recipeIngredients.map(i => i.id),
        inputtest: recipeToEdit.value?.recipeIngredients.map(i => {
            return {
                ingredient_id: i.id,
                recipe_id: props.id,
                unit: i.unit.id,
                amount: i.amount
            }
        }),
        description: recipeToEdit.value?.description,
        name: recipeToEdit.value?.name,
        steps: recipeToEdit.value?.steps
    },
}))

const { mutate: mutateCreate } = useMutation(createRecipeMutation, () => ({
    variables: {
        description: recipeToEdit.value?.description,
        name: recipeToEdit.value?.name,
        steps: recipeToEdit.value?.steps,
        data: recipeToEdit.value?.recipeIngredients.map(i => {
            return {
                ingredient_id: i.id,
                recipe_id: props.id,
                unit: i.unit.id,
                amount: i.amount
            }
        })
        }
}))

function clickHandler() {

    if (props.id) {
        newMutatename()
    } else {
        mutateCreate()
    }


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
                        class="mt-10 text-3xl font-bold focus:ring-0 text-slate-800 border-2 border-white focus:border-slate-400 hover:focus:border-solid hover:border-dashed hover:border-slate-400"
                    />
                    <input
                        type="text"
                        placeholder="description"
                        class="grow my-3 focus:ring-0 text-slate-800 border-2 border-white focus:border-slate-400 hover:focus:border-solid hover:border-dashed hover:border-slate-400"
                        v-model="recipeToEdit.description"
                    />
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
                                    unit: unit
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