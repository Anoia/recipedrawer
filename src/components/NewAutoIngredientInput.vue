<script setup lang="ts">
import { extractRecipeMatchResult } from '../stuff/parse';
import { Ingredient, Unit } from '../types/recipe';
import { computed, ref, nextTick, onMounted, ComputedRef } from 'vue';
import IngredientCreation from './IngredientCreation.vue'
import fuzzysort from 'fuzzysort'

const props = defineProps<{
    ingredients: Readonly<Ingredient[]>,
    units: Readonly<Unit[]>,
    elementId: string,
    input: string
}>()

let defaultUnit = computed(() => props.units.find(u => u.long_name === "Stück"))

const emit = defineEmits<{
    (e: 'selectItem', item: any): void
    (e: 'cancel'): void
}>()

onMounted(() => {
    if (props.input) {
        document.getElementById(props.elementId)?.focus();
    }
})

const userInputString = ref(props.input)
const isInputFocused = ref(false)

const matchResult = computed(() => extractRecipeMatchResult(userInputString.value))

function findExactUnitMatch(unitName: string) {
    return props.units.find(u => u.long_name.toLowerCase() === unitName.toLowerCase() || u.short_name.toLowerCase() === unitName.toLowerCase())
}

function findPossibleUnits(unitName: string): Unit[] {
    const regexp = new RegExp(escapeReg(unitName.trim()), 'i');
    return props.units.filter((u) => u.long_name.match(regexp) || u.short_name.match(regexp))
}

const ingredientExtraInfo = computed(() => {
        if (matchResult.value && matchResult.value.extra_info) {
        return matchResult.value.extra_info
    }
})

const possibleUnit = computed(() => {
    if (matchResult.value && matchResult.value.unitName) {
        return findExactUnitMatch(matchResult.value.unitName)
    }
})

const ingredientInputString = computed(() => {
    let ingredientInput = matchResult.value?.ingredientName.trim()
    if (matchResult.value?.unitName != undefined && possibleUnit.value == undefined && matchResult.value?.ingredientName != undefined) {
        return `${matchResult.value?.unitName} ${ingredientInput}`
    } else {

        return ingredientInput
    }
}
)

const isAutocompleteListVisible = computed(() => {
    let unsureAboutInput: boolean = matchResult.value?.unitName == undefined && matchResult.value?.ingredientName != undefined && findPossibleUnits(matchResult.value?.ingredientName).length > 0
    return isInputFocused.value && !unsureAboutInput && ingredientInputString.value && ingredientInputString.value?.length >= 2
}
)

function escapeReg(i: string) {
    return i.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const fuzzyIngredients: ComputedRef<Fuzzysort.KeyResults<Ingredient>> = computed(() => {

    let target = ingredientInputString.value ?? ''

    return fuzzysort.go(target, props.ingredients, { key: 'name', all: true,threshold: -50000, })
})

const currentIngredientSelectionIndex = ref(0)

const currentIngredientSelection = computed(() => {
    return isAutocompleteListVisible.value && currentIngredientSelectionIndex.value < fuzzyIngredients.value.length ? fuzzyIngredients.value[currentIngredientSelectionIndex.value].obj : undefined
})

function onInput(e:any) {
    userInputString.value = e.target.value
    if (isAutocompleteListVisible.value && currentIngredientSelectionIndex.value > fuzzyIngredients.value.length) {
        currentIngredientSelectionIndex.value = (fuzzyIngredients.value.length || 1) - 1
    }
}

function onArrowDown() {
    if (isAutocompleteListVisible.value && currentIngredientSelectionIndex.value < fuzzyIngredients.value.length - 1) {
        currentIngredientSelectionIndex.value++
        scrollSelectedToView()
    }
}
function onArrowUp() {
    if (isAutocompleteListVisible.value && currentIngredientSelectionIndex.value > 0) {
        currentIngredientSelectionIndex.value--
        scrollSelectedToView()
    }
}

function scrollSelectedToView() {
    const wrapper = document.getElementById(`${props.elementId}-wrapper`)
    const selectedItem = document.getElementById(`autocompleteingredient-${currentIngredientSelectionIndex.value}`)

    if (isAutocompleteListVisible.value && wrapper && selectedItem) {

        const heightOfWrapper = wrapper.offsetHeight

        let selectedItemPositionInList = selectedItem.offsetTop - wrapper.offsetTop
        let selectedItemScrollPosition = selectedItemPositionInList - wrapper.scrollTop

        if (selectedItemScrollPosition < 0) {
            wrapper.scrollTo(0, selectedItemPositionInList)
        } else if (selectedItemScrollPosition + selectedItem.scrollHeight > heightOfWrapper) {
            wrapper.scrollTo(0, selectedItemPositionInList - heightOfWrapper + selectedItem.scrollHeight)
        }
    }
}

function onFocus() {
    isInputFocused.value = true
}
function onBlur() {
    isInputFocused.value = false
    if (!showCreateIngredientDialog.value) {
        userInputString.value = ""
        emit('cancel')
    }
}

function selectIngredient(i: Ingredient) {
    if (matchResult.value && defaultUnit) {
        emit('selectItem', {
            amount: matchResult.value.amount,
            unit: (possibleUnit.value ?? defaultUnit),
            extraInfo: ingredientExtraInfo.value,
            ingredient: {
                id: i.id,
                name: i.name,
                diet:i.diet
            }
            
        })
        clearData()
    }
    nextTick(() => document.getElementById(props.elementId)?.focus())

}

function selectCurrentSelection() {
    if (currentIngredientSelection.value) {
        selectIngredient(currentIngredientSelection.value)
    } else if (fuzzyIngredients.value.length == 0) {
        notFound()
    }
}

function notFound() {
    if (matchResult.value && defaultUnit && ingredientInputString.value) {
        addNewIngredient(ingredientInputString.value)
    }
}

function clearData() {
    userInputString.value = ""
    currentIngredientSelectionIndex.value = 0
}


//// new  ingredient creation 

function addNewIngredient(name: string) {
    newIngredientName.value = name
    showCreateIngredientDialog.value = true
}
function hideDialog() {
    showCreateIngredientDialog.value = false
    nextTick(() => document.getElementById(props.elementId)?.focus())
}

const newIngredientName = ref("")
const showCreateIngredientDialog = ref(false)

</script>

<template>
    <IngredientCreation
        :open="showCreateIngredientDialog"
        :input="newIngredientName"
        @close="hideDialog"
        @created="selectIngredient"
    />

    <div>
        <input
            :id="props.elementId"
            class="w-full"
            type="text"
            :value="userInputString"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @keydown.down.prevent="onArrowDown"
            @keydown.up.prevent="onArrowUp"
            @keydown.enter.tab.prevent="selectCurrentSelection"
            autocomplete="off"
            placeholder="100g Mehl"
        />
        <div
            v-if="isAutocompleteListVisible"
            :id="`${props.elementId}-wrapper`"
            class="max-h-28 overflow-y-auto scrollbar-hide"
        >
            <ul>
                <li
                    v-for="(i, index) in fuzzyIngredients"
                    :id="`autocompleteingredient-${index}`"
                    :key="index"
                    :class="{ 'bg-slate-400': currentIngredientSelectionIndex == index }"
                    @mouseenter="currentIngredientSelectionIndex = index"
                    @mousedown.prevent
                    @click.stop="selectIngredient(i.obj)"
                >{{ i.obj.name }}</li>
                <li
                    class="bg-slate-200 font-normal"
                    @mousedown.prevent
                    @click.stop="notFound"
                >add new</li>
            </ul>
        </div>
    </div>
</template>