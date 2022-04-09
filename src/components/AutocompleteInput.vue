<script setup lang="ts">
import { reactive, ref, computed } from 'vue'


const props = defineProps<{
    items: any[],
    projection: Function,
    id: string
}>()

const emit = defineEmits<{
    (e: 'selectItem', item: any): void
    (e: 'notFound', name: string): void
}>()

const inputId = props.id || `autocomplete_input_${(Math.random() * 1000).toFixed()}`


const inputTest = ref("")
const currentSelectionIndex = ref(0)

const isInputFocused = ref(false)

function escapeReg(i: string) {
    return i.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const filteredItems = computed(() => {

    const regexp = new RegExp(escapeReg(inputTest.value), 'i');
    return props.items.filter((item) => props.projection(item).match(regexp))
}
)

const isListVisible = computed(() => {
    return isInputFocused.value && inputTest.value.length >= 1 //&& filteredItems.value.length
})

const currentSelection = computed(() => {
    return isListVisible.value && currentSelectionIndex.value < filteredItems.value.length ? filteredItems.value[currentSelectionIndex.value] : undefined
})

function onInput() {
    if (isListVisible && currentSelectionIndex.value > filteredItems.value.length) {
        currentSelectionIndex.value = (filteredItems.value.length || 1) - 1
    }
}
function onFocus() {
    isInputFocused.value = true
}
function onBlur() {
    isInputFocused.value = false
}
function onArrowDown() {
    if (isListVisible.value && currentSelectionIndex.value < filteredItems.value.length - 1) {
        currentSelectionIndex.value++
    }
    scrollSelectionIntoView()
}
function onArrowUp() {
    if (isListVisible.value && currentSelectionIndex.value > 0) {
        currentSelectionIndex.value--
    }
    scrollSelectionIntoView()
}
function selectCurrentSelection() {
    if (currentSelection.value) {
        selectItem(currentSelection.value)
    }else if (filteredItems.value.length == 0){
        notFound()
    }
}

function selectItem(item: any) {
    inputTest.value = props.projection(item)
    currentSelectionIndex.value = 0
    document.getElementById(inputId)?.blur();
    emit('selectItem', item)
    inputTest.value = ""
}

function notFound() {
    let name = inputTest.value
    currentSelectionIndex.value = 0
    document.getElementById(inputId)?.blur();
    emit('notFound', name)
    inputTest.value = ""
}

function scrollSelectionIntoView() {

}

</script>

<template>
    <div class="w-full relative">
        <input
            :id="inputId"
            class="w-full"
            type="text"
            v-model="inputTest"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @keydown.down.prevent="onArrowDown"
            @keydown.up.prevent="onArrowUp"
            @keydown.enter.tab.prevent="selectCurrentSelection"
            autocomplete="off"
        />
        <div
            v-if="isListVisible"
            class="absolute w-full max-h-24 bg-white overflow-y-auto z-10 border-2 border-slate-600"
        >
            <ul>
                <li
                    v-for="(i, index) in filteredItems"
                    :key="index"
                    :class="{ 'bg-slate-400': currentSelectionIndex == index }"
                    @mouseenter="currentSelectionIndex = index"
                    @mousedown.prevent
                    @click="selectItem(i)"
                >{{ props.projection(i) }}</li>
                <li
                    v-if="filteredItems.length == 0"
                    class="bg-slate-400 font-normal"
                    @mousedown.prevent
                    @click="notFound"
                >add new</li>
            </ul>
        </div>
    </div>
</template>
