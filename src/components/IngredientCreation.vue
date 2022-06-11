<script setup lang="ts">

import { onMounted, Ref, ref, watch, nextTick } from 'vue'
import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'

const props = defineProps<{
    open: boolean
    input: string
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'created', newIngredient: any): void // TYPE ME
}>()

watch(() => props.open, (newValue: boolean) => {
    if (newValue) {
        ingredientName.value = props.input
        nextTick(() => createIngredientDialogInput.value?.focus())
    }
})

onMounted(() => {
    if (createIngredientDialogInput.value) {
        nextTick(() => createIngredientDialogInput.value?.focus())
    }
})

const ingredientName = ref(props.input)
const diet = ref('vegan')

const createIngredientDialogInput: Ref<HTMLInputElement | null> = ref(null)

function setClosed() {
    emit('close')
}

function create() {
    insertIngredient()
}


let insert = gql`
mutation MyMutation($name: String, $diet:String) {
  insert_ingredients_one(object: {name: $name, diet: $diet}) {
    id
    name
    diet
  }
}
`

const { mutate: insertIngredient, onDone } = useMutation(insert, () => ({
    variables: {
        name: ingredientName.value,
        diet: diet.value
    },  // TODO cache update !!
}))

onDone(result => {
    console.log(result.data)
    let id = result.data.insert_ingredients_one.id
    let name = result.data.insert_ingredients_one.name
    emit('created', { id: id, name: name })
    setClosed()
})


</script>


<template>
    <Dialog
        :open="props.open"
        class="fixed inset-x-0 top-36 z-10 overflow-y-auto p-0 w-1/4 min-w-fit"
        @keyup.esc="setClosed"
    >
        <div>
            <div class="fixed inset-0 bg-black opacity-30" @click.stop="setClosed" />

            <div
                @keyup.esc="setClosed"
                class="relative w-full mx-auto bg-white rounded p-10 flex flex-col"
            >
                <h1 class="my-3 text-2xl font-bold text-slate-700">Create new Ingredient</h1>
                <p class="my-1">Please enter the ingredient name:</p>
                <input
                    class="mb-5"
                    type="text"
                    @keypress.enter="create"
                    ref="createIngredientDialogInput"
                    placeholder="Name"
                    v-model="ingredientName"
                />
                <div class="flex justify-center">
                    <div class="flex">
                        <div class="flex items-center mr-4">
                            <input
                                type="radio"
                                id="vegan"
                                name="diet"
                                value="vegan"
                                v-model="diet"
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
                                v-model="diet"
                                class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-1"
                            />
                            <label
                                for="vegetarian"
                                class="ml-2 text-sm font-medium text-teal-600"
                            >vegetarian</label>
                        </div>

                        <div class="flex items-center mr-4">
                            <input
                                type="radio"
                                id="fish"
                                name="diet"
                                value="fish"
                                v-model="diet"
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
                                v-model="diet"
                                class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-1"
                            />
                            <label for="meat" class="ml-2 text-sm font-medium text-red-600">meat</label>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row my-5 space-x-5">
                    <button
                        @click="setClosed"
                        class="text-white bg-slate-300 hover:bg-slate-400 basis-1/2"
                    >Cancel</button>
                    <button
                        @click="create"
                        class="text-white bg-slate-500 hover:bg-slate-600 p-3 basis-1/2"
                    >Create</button>
                </div>
            </div>
        </div>
    </Dialog>
</template>