
export type Unit = {
    id: number,
    long_name: string,
    short_name:string
}

export type Ingredient = {
    id: string,
    name: string,
    amount: number,
    unit:Unit
}

export type Step = {
    id: string,
    content: string
}

export type EditableRecipe = {
    name: string,
    description: string,
    steps: Step[],
    recipeIngredients: Ingredient[]
}

export const emptyRecipe:EditableRecipe  = 
   {
        name: "",
        description: "",
        steps: [],
        recipeIngredients: []
    }
