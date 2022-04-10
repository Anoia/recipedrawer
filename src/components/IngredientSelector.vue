<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ComputedRef, ref, Ref, onMounted, watch, nextTick } from 'vue'
import AutocompleteInputVue from './AutocompleteInput.vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import { Unit } from '../types/recipe'
import IngredientCreation from './IngredientCreation.vue'


const props = defineProps<{ addIngredient: (name: string, id: string, amount: number, unit: Unit) => void }>()

const amount = ref(1)

const inputRef = ref<HTMLInputElement | null>(null)

const selectedUnit = ref<Unit>({ id: 1, long_name: "l", short_name: "s" })

const { result, loading } = useQuery(gql`
    query get_ingredients_and_units {
      ingredients {
        name
        id
      }
      units {
        id
        long_name
        short_name
      }
    }
  `, {
  fetchPolicy: 'cache-and-network',
})

watch(loading, async (newLoading, oldloading) => {
  if (!newLoading && oldloading) {
    nextTick(() => {
      inputRef.value?.focus();
      inputRef.value?.select();
      selectedUnit.value = result.value.units[0]
    })
  }
})

function doSelect(i: any) {
  props.addIngredient(i.name, i.id, amount.value, selectedUnit.value)
  amount.value = 1
  nextTick(() => {

    inputRef.value?.focus();
    inputRef.value?.select();
  })
}

function addNewIngredient(name: string) {

  console.log(`ADDING NEW INGREDIENT ${name}`)
  newIngredientName.value = name
  showCreateIngredientDialog.value = true
}
function hideDialog() {
  showCreateIngredientDialog.value = false
}

const newIngredientName = ref("")
const showCreateIngredientDialog = ref(false)

</script>

<template>
  <IngredientCreation
    :open="showCreateIngredientDialog"
    :input="newIngredientName"
    @close="hideDialog"
    @created="doSelect"
  />

  <div class="flex" v-if="!loading">
    <input type="text" class="w-10" placeholder="1" v-model="amount" ref="inputRef" />
    <div class>
      <Listbox v-model="selectedUnit">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          >
            <span class="block truncate">{{ selectedUnit.long_name }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon class="w-5 h-5 text-gray-900" />
            </span>
          </ListboxButton>
          <ListboxOptions
            class="absolute w-24 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              as="div"
              v-slot="{ active, selected }"
              v-for="unit in result.units"
              :key="unit.id"
              :value="unit"
            >
              <li
                :class="[
                  active ? 'text-white bg-slate-400' : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-4 pr-4',
                ]"
              >
                <!-- <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-800"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>-->
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block ',
                  ]"
                >{{ unit.long_name }}</span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
    <AutocompleteInputVue
      class="grow"
      id="autocomplete-1"
      :items="result.ingredients"
      :projection="(i: any) => i.name"
      @select-item="doSelect"
      @not-found="addNewIngredient"
    ></AutocompleteInputVue>
  </div>
</template>
