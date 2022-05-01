import { EditableRecipe, RecipeIngredient } from '../types/recipe'
import { Ingredients, Recipes, Recipe_Ingredients, Units } from '../generated/graphql.d'

export function parseAllRecipesResult(result:Array<Recipes>):Array<Recipes>{
    return result
}

// correct: Maybe<Recipes>
export function parseGetRecipeByIdResult(recipe:Recipes):EditableRecipe{
    let editableRecipe:EditableRecipe = {
        name:recipe.name,
        description:(recipe.description ?? ''),
        image: (recipe.image ?? ''),
        recipeIngredients:recipe.recipe_ingredients.map(mapIngredient),
        steps:recipe.steps
    }
    editableRecipe.recipeIngredients.sort((a,b) => (a.index < b.index ? -1: 1))
    return editableRecipe
}

function mapIngredient(i:Recipe_Ingredients):RecipeIngredient {
    return{
        id:i.id,
        amount:i.amount,
        index:i.index,
        ingredient_id:i.ingredient_id, 
        name:i.ingredient.name,
        unit: i.unitByUnit
    }
}