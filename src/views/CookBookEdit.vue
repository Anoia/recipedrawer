<script setup lang="ts">

import { useQuery, useMutation } from '@vue/apollo-composable'
import { computed, watch, ref, Ref, nextTick, onMounted } from 'vue'
import IngredientSelectorVue from '../components/IngredientSelector.vue'
import { Ingredient, Step, EditableRecipe, getEmptyRecipe, getImageUrl } from '../types/recipe'
import { getRecipeQuery, parseGetRecipeQueryResult, createRecipeMutation, editRecipeMutation } from '../gql/queries'

import { TrashIcon, ChevronUpIcon, ChevronDownIcon, PlusIcon } from '@heroicons/vue/outline'
import axios from "axios"
import { useRouter } from 'vue-router'

const props = defineProps({
    id: String
})

const router = useRouter()

const { result, loading, error } = useQuery(getRecipeQuery, {
    id: props.id
})

onMounted(() => {
    handleInit(result.value, loading.value)
})

watch([result, loading], async ([newResult, newLoading]) => {
    handleInit(newResult, newLoading)
})


function handleInit(newResult: any, newLoading: boolean) {
    if (props.id && newResult) {
        recipeToEdit.value = parseGetRecipeQueryResult(newResult)
    } else if (!props.id || !newLoading) {
        recipeToEdit.value = getEmptyRecipe()
    }
    nextTick(() => resizeAllTextAreas())
}

const recipeToEdit: Ref<EditableRecipe | undefined> = ref(undefined)

const imageUrl = computed(() => {
    if (recipeToEdit.value) {
        return getImageUrl(recipeToEdit.value.image, 200, 200)
    } else return 'https://via.placeholder.com/200'
})

const stepRefs = ref<any[]>([])


function addNewStep() {
    const newId = (recipeToEdit?.value?.steps.length) ?? 0
    recipeToEdit?.value?.steps.push({ id: (recipeToEdit?.value?.steps.length + 1)?.toString(10), content: "" })

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

const { mutate: newMutatename, onDone: onDoneMutate } = useMutation(editRecipeMutation, () => ({
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
        steps: recipeToEdit.value?.steps,
        image: recipeToEdit.value?.image
    },
}))

const { mutate: mutateCreate, onDone: onDoneCreate } = useMutation(createRecipeMutation, () => ({
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

onDoneCreate(r => {
    console.log(r)
    let id = r.data.insert_recipes_one.id
    router.push(`/recipe/${id}`)
})

onDoneMutate(r => {
    console.log(r)
    let id = r.data.update_recipes_by_pk.id
    router.push(`/recipe/${id}`)
})

function clickHandler() {
    if (props.id) {
        newMutatename()
    } else {
        mutateCreate()
    }
}

function removeIngredient(i: Ingredient) {
    if (recipeToEdit.value?.recipeIngredients.includes(i)) {
        recipeToEdit.value?.recipeIngredients.splice(recipeToEdit.value.recipeIngredients.indexOf(i), 1)
        resetIngredientIds()
    }
}

function moveStep(s: Step, direction: number) {
    if (recipeToEdit.value?.steps.includes(s)) {
        let currentIndex = recipeToEdit.value.steps.indexOf(s)
        let newIndex = currentIndex + direction

        if (newIndex >= 0 && newIndex < recipeToEdit.value.steps.length) {
            recipeToEdit.value.steps.splice(currentIndex, 1)
            recipeToEdit.value.steps.splice(newIndex, 0, s)
        }
        resetStepIds()
    }


}

function moveIngredient(i:Ingredient, direction:number) {
    if (recipeToEdit.value?.recipeIngredients.includes(i)) {
        let currentIndex = recipeToEdit.value.recipeIngredients.indexOf(i)
        let newIndex = currentIndex + direction

        if (newIndex >= 0 && newIndex < recipeToEdit.value.recipeIngredients.length) {
            recipeToEdit.value.recipeIngredients.splice(currentIndex, 1)
            recipeToEdit.value.recipeIngredients.splice(newIndex, 0, i)
        }
        resetIngredientIds()
    }
}

function removeStep(s: Step) {
    if (recipeToEdit.value?.steps.includes(s)) {
        recipeToEdit.value?.steps.splice(recipeToEdit.value.steps.indexOf(s), 1)
    }
    resetStepIds()
}

function resetStepIds() {
    if (recipeToEdit.value != undefined) {
        recipeToEdit.value.steps = recipeToEdit.value.steps.map((el, i) => {
            el.id = `${i + 1}`
            return el
        })
    }
}

// TODO remove Index/Id column from frontend, just sort correctly initalliy and send BE the correct order on mutate


function resetIngredientIds(){
        if (recipeToEdit.value != undefined) {
        recipeToEdit.value.recipeIngredients = recipeToEdit.value.recipeIngredients.map((el, i) => {
            el.id = `${i + 1}`
            return el
        })
    }
}

const selectedFileToUpload = ref("")

const displayUploadBtn = computed(() => { if (selectedFileToUpload.value && selectedFileToUpload.value != "") return true; else return false })

function onFileSelected(event: any) {
    selectedFileToUpload.value = event.target.files[0]
}

function uploadFile() {

    let file = selectedFileToUpload.value
    let formData = new FormData()

    formData.append("file", file)
    formData.append("upload_preset", "cookbook_recipe")

    axios({
        url: "https://api.cloudinary.com/v1_1/ddqdrc3ak/image/upload",  // todo config
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: formData
    })
        .then((res) => {
            console.log(res);
            if (recipeToEdit.value) {
                recipeToEdit.value.image = res?.data?.public_id ?? ""
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

</script>

<template>
    <div>
        <p v-if="error && props.id">Error: {{ error }}</p>
        <p v-if="!recipeToEdit">Loading..</p>
        <div v-if="recipeToEdit" class="container mx-auto max-w-4xl">
            <div class="flex flex-col sm:flex-row">
                <div class="flex flex-col items-stretch">
                    <img class="m-5 max-w-[200px]" :src="imageUrl" />

                    <input type="file" @change="onFileSelected" />
                    <button v-if="displayUploadBtn" @click="uploadFile">Upload</button>
                </div>
                <div class="flex flex-col flex-grow mx-5 mt-5">
                    <input
                        type="text"
                        v-model="recipeToEdit.name"
                        placeholder="Recipe title"
                        class="mt-10 text-3xl font-bold focus:ring-0 text-slate-800 border-2 border-white focus:border-slate-400 hover:focus:border-solid hover:border-dashed hover:border-slate-400"
                    />
                    <input
                        type="text"
                        placeholder="description"
                        class="grow-0 my-3 focus:ring-0 text-slate-800 border-2 border-white focus:border-slate-400 hover:focus:border-solid hover:border-dashed hover:border-slate-400"
                        v-model="recipeToEdit.description"
                    />
                    <div class="grow"></div>
                    <p class="relative bottom-0 grow-0 text-slate-500 text-right">written by me</p>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row">
                <div class="basis-1/3 m-5 border-slate-400">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Ingredients</h3>
                    <ul class="my-3">
                        <li
                            v-for="i in recipeToEdit?.recipeIngredients"
                            class="border-b-[1px] last:border-b-0 p-2 border-slate-300 hover:bg-slate-100 group"
                        >
                            <div class="flex">
                                <span
                                    class="grow"
                                >{{ i.amount }} {{ i.unit.short_name }} {{ i.name }}</span>
                                <button
                                    class="grow-0 hidden group-hover:inline"
                                    @click="moveIngredient(i, -1)"
                                >
                                    <ChevronUpIcon class="h-4 w-4 text-slate-500" />
                                </button>
                                <button
                                    class="grow-0 hidden group-hover:inline"
                                    @click="moveIngredient(i, 1)"
                                >
                                    <ChevronDownIcon class="h-4 w-4 text-slate-500" />
                                </button>
                                <button
                                    class="grow-0 pr-1 hidden group-hover:inline"
                                    @click="removeIngredient(i)"
                                >
                                    <TrashIcon class="h-4 w-4 text-slate-500" />
                                </button>
                            </div>
                        </li>
                        <li>
                            <IngredientSelectorVue
                                :add-ingredient="(name, id, amount, unit) => recipeToEdit?.recipeIngredients.push({
                                    index:recipeToEdit.recipeIngredients.length,
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
                    <div v-for="(step, i) in recipeToEdit?.steps" class="flex my-5 group">
                        <span class="text-3xl p-1 pr-4 text-slate-500">{{ step.id }}</span>
                        <textarea
                            :ref="el => { stepRefs[i] = el }"
                            type="text"
                            v-model="step.content"
                            @input="testEvent"
                            placeholder="..."
                            class="overflow-hidden resize-none grow border-2 border-white focus:border-slate-400 hover:focus:border-solid focus:ring-0 hover:border-dashed hover:border-slate-400"
                        />
                        <div class="w-5">
                            <button class="mx-2 mb-1 hidden group-hover:block">
                                <ChevronUpIcon
                                    class="h-4 w-4 text-slate-500"
                                    @click="moveStep(step, -1)"
                                />
                            </button>
                            <button class="mx-2 my-1 hidden group-hover:block">
                                <ChevronDownIcon
                                    class="h-4 w-4 text-slate-500"
                                    @click="moveStep(step, 1)"
                                />
                            </button>
                            <button
                                class="mx-2 mt-1 hidden group-hover:block"
                                @click="removeStep(step)"
                            >
                                <TrashIcon class="h-4 w-4 text-slate-500" />
                            </button>
                        </div>
                    </div>
                    <div class="flex my-5 justify-center">
                        <button @click="addNewStep">
                            <PlusIcon class="h-8 w-8 hover:h-9 hover:w-9 text-slate-500" />
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button
                    @click="clickHandler"
                    class="bg-slate-500 hover:bg-slate-600 text-white p-3 w-40 m-10"
                >Save</button>
            </div>
        </div>
    </div>
</template>