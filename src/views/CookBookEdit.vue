<script setup lang="ts">

import { useQuery, useMutation, useResult } from '@vue/apollo-composable'
import { computed, watch, ref, Ref, nextTick, onMounted } from 'vue'
import NewAutoIngredientInputVue from '../components/NewAutoIngredientInput.vue'
import { RecipeIngredient, Step, EditableRecipe, getEmptyRecipe, getImageUrl, Ingredient, Unit, RecipeIngredientSection } from '../types/recipe'
import { TrashIcon, ChevronUpIcon, ChevronDownIcon, PlusIcon } from '@heroicons/vue/outline'
import axios from "axios"
import { useRouter } from 'vue-router'
import { GetIngredientsAndUnits, GetRecipeById, EditRecipe, CreateRecipe, EditRecipeMutationVariables, CreateRecipeMutationVariables, Recipe_Ingredients_Insert_Input } from '../generated/graphql.d'
import { parseGetRecipeByIdResult } from '../gql/queryHelper'
import { inputStringToInterval } from '../stuff/parse'
import draggable from 'vuedraggable'

const props = defineProps<{
    id: string
}>()

const router = useRouter()

const { result, loading, error } = useQuery(GetRecipeById, {
    id: props.id
})

const recipeTitleInput: Ref<HTMLInputElement | null> = ref(null)

onMounted(() => {
    handleInit(result.value, loading.value)
})

const parsedResult: Ref<EditableRecipe | undefined> = useResult(result, undefined, data => parseGetRecipeByIdResult(data.recipes_by_pk))

watch([result, loading], async ([newResult, newLoading]) => {
    handleInit(newResult, newLoading)
})

const { result: loadedData } = useQuery(GetIngredientsAndUnits)
const allIngredients = useResult(loadedData, [] as Ingredient[], ((data) => data.ingredients as Ingredient[]))
const allUnits = useResult(loadedData, [] as Unit[], ((data) => data.units as Unit[]))


function handleInit(newResult: any, newLoading: boolean) {
    if (props.id && newResult) {
        recipeToEdit.value = parsedResult.value
    } else if (!props.id || !newLoading) {
        recipeToEdit.value = getEmptyRecipe()
        if (recipeTitleInput.value) {
            nextTick(() => recipeTitleInput.value?.focus())
        }
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

const { mutate: newMutatename, onDone: onDoneMutate } = useMutation(EditRecipe, () => {
    var ingredients: Recipe_Ingredients_Insert_Input[] = []

    if (recipeToEdit.value) {
        var currentSectionName: string | undefined = undefined

        ingredients = recipeToEdit.value.recipeIngredients.reduce((prev, current, index) => {
            if (current.type === "ingredient") {

                let newIngredient = {
                    id: current.id,
                    ingredient_id: current.ingredient_id,
                    recipe_id: parseInt(props.id),
                    unit: current.unit.id,
                    amount: current.amount,
                    index: index,
                    section: currentSectionName
                }
                prev.push(newIngredient)
                return prev
            } else {
                currentSectionName = current.name
                return prev
            }
        }, Array<Recipe_Ingredients_Insert_Input>())
    }

    let deleteNotIn: number[] = []

    ingredients.forEach(i => {
        if (i.id) {
            deleteNotIn.push(i.id)
        }
    })

    let variables: EditRecipeMutationVariables = {
        recipe_id: parseInt(props.id),
        delete_not_in: deleteNotIn,
        insert: ingredients.filter(i => i.id == undefined),
        update: ingredients.filter(i => i.id != undefined),
        description: recipeToEdit.value?.description,
        name: recipeToEdit.value?.name,
        steps: recipeToEdit.value?.steps,
        image: recipeToEdit.value?.image,
        portions: recipeToEdit.value?.portions ?? 2,
        prep_time: inputStringToInterval(recipeToEdit.value?.prepTime),
        cook_time: inputStringToInterval(recipeToEdit.value?.cookingTime)
    }

    return ({
        variables: variables,
    })
})

const { mutate: mutateCreate, onDone: onDoneCreate } = useMutation(CreateRecipe, () => {
    var ingredients: Recipe_Ingredients_Insert_Input[] = []

    if (recipeToEdit.value) {

        var currentSectionName: string | undefined = undefined

        ingredients = recipeToEdit.value.recipeIngredients.reduce((prev, current, index) => {
            if (current.type === "ingredient") {

                let newIngredient = {
                    ingredient_id: current.ingredient_id,
                    unit: current.unit.id,
                    amount: current.amount,
                    index: index,
                    section: currentSectionName
                }
                prev.push(newIngredient)
                return prev
            } else {
                currentSectionName = current.name
                return prev
            }
        }, Array<Recipe_Ingredients_Insert_Input>())

    }

    let vars: CreateRecipeMutationVariables = {
        description: recipeToEdit.value?.description,
        name: recipeToEdit.value?.name,
        steps: recipeToEdit.value?.steps,
        data: ingredients,
        image: recipeToEdit.value?.image,
        portions: recipeToEdit.value?.portions ?? 2,
        prep_time: inputStringToInterval(recipeToEdit.value?.prepTime),
        cook_time: inputStringToInterval(recipeToEdit.value?.cookingTime)
    }

    return ({
        variables: vars
    })
})

onDoneCreate(r => {
    let id = r.data.insert_recipes_one.id
    router.push(`/recipe/${id}`)
})

onDoneMutate(r => {
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

function removeIngredient(i: RecipeIngredient | RecipeIngredientSection) {
    if (recipeToEdit.value?.recipeIngredients.includes(i)) {
        recipeToEdit.value?.recipeIngredients.splice(recipeToEdit.value.recipeIngredients.indexOf(i), 1)
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

function moveIngredient(i: RecipeIngredient | RecipeIngredientSection, direction: number) {
    if (recipeToEdit.value?.recipeIngredients.includes(i)) {
        let currentIndex = recipeToEdit.value.recipeIngredients.indexOf(i)
        let newIndex = currentIndex + direction

        if (newIndex >= 0 && newIndex < recipeToEdit.value.recipeIngredients.length) {
            recipeToEdit.value.recipeIngredients.splice(currentIndex, 1)
            recipeToEdit.value.recipeIngredients.splice(newIndex, 0, i)
        }
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
            console.log(`uploaded image: ${res}`);
            if (recipeToEdit.value) {
                let imageId = res?.data?.public_id ?? ""
                recipeToEdit.value.image = imageId
            }
        })
        .catch((err) => {
            console.log(`error on cloudinary upload${err}`);
        })
}

function doSelect(i: any) {
    // TODO type 
    recipeToEdit.value?.recipeIngredients.push({
        type: "ingredient",
        id: undefined,
        name: i.ingredient.name,
        ingredient_id: i.ingredient.id,
        amount: i.amount,
        unit: i.unit
    })
}

function editIngredient(i: any) {
    if (recipeToEdit.value && editingIngredientIndex.value != -1) {
        let oldIng = recipeToEdit.value.recipeIngredients[editingIngredientIndex.value]
        if (oldIng.type === "ingredient") {
            let newIng: RecipeIngredient = {
                type: "ingredient",
                id: oldIng.id,
                name: i.ingredient.name,
                ingredient_id: i.ingredient.id,
                amount: i.amount,
                unit: i.unit
            }
            recipeToEdit.value.recipeIngredients[editingIngredientIndex.value] = newIng
            resetEditingIngredientIndex()
        }
    }
}

let editingIngredientIndex: Ref<number> = ref(-1)

function setEditingIngredientIndex(i: number) {
    editingIngredientIndex.value = i
}

function resetEditingIngredientIndex() {
    editingIngredientIndex.value = -1
}

const newSectionName: Ref<string> = ref("")

function addSection() {
    if (newSectionName.value && recipeToEdit.value) {
        recipeToEdit.value.recipeIngredients.push({
            type: "section",
            name: newSectionName.value
        })
        newSectionName.value = ""
    }
}

</script>

<template>
    <div>
        <p v-if="error && props.id">Error: {{ error }}</p>
        <p v-if="!recipeToEdit">Loading..</p>
        <div v-if="recipeToEdit" class="container mx-auto max-w-4xl text-slate-800">
            <div class="flex flex-col sm:flex-row">
                <div class="flex flex-col items-stretch">
                    <img class="m-5 max-w-[200px]" :src="imageUrl" />

                    <input type="file" @change="onFileSelected" />
                    <button v-if="displayUploadBtn" @click="uploadFile">Upload</button>
                </div>
                <div class="flex flex-col flex-grow mx-5 mt-5">
                    <input
                        type="text"
                        ref="recipeTitleInput"
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
                    <span>
                        <label>Portions:</label>
                        <input type="number" v-model="recipeToEdit.portions" />
                    </span>
                    <span>
                        <label>Total time:</label>
                        <input type="text" v-model="recipeToEdit.cookingTime" />
                    </span>
                    <span>
                        <label>Prep time:</label>
                        <input type="text" v-model="recipeToEdit.prepTime" />
                    </span>
                    <p class="relative bottom-0 grow-0 text-slate-500 text-right">written by me</p>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row" v-if="recipeToEdit">
                <div class="basis-1/3 m-5 border-slate-400">
                    <h3 class="text-xl my-2 px-2 py-1 bg-slate-300">Ingredients</h3>
                    <draggable
                        class="my-3"
                        :list="recipeToEdit.recipeIngredients"
                        item-key="name"
                        ghost-class="bg-slate-500"
                    >
                        <template #item="{ element, index }">
                            <div
                                class="border-b-[1px] last:border-b-0 p-2 border-slate-300 hover:bg-slate-200 group"
                            >
                                <div
                                    v-if="editingIngredientIndex != index && element.type === 'ingredient'"
                                    class="flex"
                                >
                                    <span
                                        class="grow"
                                        @click.stop="setEditingIngredientIndex(index)"
                                    >{{ element.amount }} {{ element.unit.short_name }} {{ element.name }}</span>
                                    <button
                                        class="grow-0 pr-1 hidden group-hover:inline"
                                        @click="removeIngredient(element)"
                                    >
                                        <TrashIcon class="h-4 w-4 text-slate-500" />
                                    </button>
                                </div>
                                <div
                                    v-if="editingIngredientIndex == index && element.type === 'ingredient'"
                                >
                                    <NewAutoIngredientInputVue
                                        :element-id="`new-auto-input-ingredient-${index}`"
                                        :ingredients="allIngredients"
                                        :units="allUnits"
                                        :input="`${element.amount} ${element.unit.short_name} ${element.name}`"
                                        @cancel="resetEditingIngredientIndex"
                                        @select-item="editIngredient"
                                    ></NewAutoIngredientInputVue>
                                </div>
                                <div v-if="element.type === 'section'" class="flex">
                                    <span class="grow text-sm font-semibold">{{ element.name }}</span>
                                    <button
                                        class="grow-0 pr-1 hidden group-hover:inline"
                                        @click="removeIngredient(element)"
                                    >
                                        <TrashIcon class="h-4 w-4 text-slate-500" />
                                    </button>
                                </div>
                            </div>
                        </template>
                    </draggable>
                    <div class="my-5">
                        <NewAutoIngredientInputVue
                            element-id="new-auto-input-new-ingredient"
                            :ingredients="allIngredients"
                            :units="allUnits"
                            :input="``"
                            @select-item="doSelect"
                        ></NewAutoIngredientInputVue>
                    </div>
                    <div class="flex flex-row">
                        <input type="text" placeholder="Add section" v-model="newSectionName" />
                        <button class="bg-slate-400 p-3 mx-2" @click="addSection">Add</button>
                    </div>
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
                    @click.stop="clickHandler"
                    class="bg-slate-500 hover:bg-slate-600 text-white p-3 w-40 m-10"
                >Save</button>
            </div>
        </div>
    </div>
</template>