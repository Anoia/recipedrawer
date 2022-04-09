<script setup lang="ts">

import { ref, watch } from 'vue'

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
    }
})

const ingredientName = ref(props.input)


function setClosed() {
    emit('close')
}

function create() {
    console.log(`creating ${ingredientName.value}`)
    insertIngredient()
}

import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'

let insert = gql`
mutation MyMutation($name: String) {
  insert_ingredients_one(object: {name: $name}) {
    id
    name
  }
}
`

const { mutate: insertIngredient, onDone } = useMutation(insert, () => ({
    variables: {
        name: ingredientName.value,
    },  // TODO cache update
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
    <Dialog :open="props.open" @close="setClosed" class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />

            <div class="relative max-w-sm mx-auto bg-white rounded">
                <DialogTitle>Create new Ingredient</DialogTitle>
                <DialogDescription>Please enter the ingredient name</DialogDescription>
                <!-- 
        <p>
          Are you sure you want to deactivate your account? All of your data will be
          permanently removed. This action cannot be undone.
                </p>-->
                <input type="text" placeholder="Name" v-model="ingredientName" />
                <br />
                <button @click="create">Create</button>
                <button @click="setClosed">Cancel</button>
            </div>
        </div>
    </Dialog>
</template>