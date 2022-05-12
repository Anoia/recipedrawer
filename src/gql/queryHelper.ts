import {
  EditableRecipe,
  RecipeIngredient,
  RecipeIngredientSection,
} from '../types/recipe'
import { Recipes } from '../generated/graphql.d'

export function parseAllRecipesResult(result: Array<Recipes>): Array<Recipes> {
  return result
}

// correct: Maybe<Recipes>
export function parseGetRecipeByIdResult(recipe: Recipes): EditableRecipe {
  var lastSectionName: string | undefined = undefined
  let editableRecipe: EditableRecipe = {
    name: recipe.name,
    description: recipe.description ?? '',
    image: recipe.image ?? '',
    portions: recipe.portions,
    cookingTime: parseInterval(recipe.cook_time),
    prepTime: parseInterval(recipe.prep_time),
    recipeIngredients: [...recipe.recipe_ingredients]
      .sort((a, b) => (a.index < b.index ? -1 : 1))
      .reduce((prev, current) => {
        if (current.section && current.section != lastSectionName) {
          prev.push({
            type: 'section',
            name: current.section,
          })
          lastSectionName = current.section
        }

        prev.push({
          type: 'ingredient',
          id: current.id,
          amount: current.amount,
          ingredient_id: current.ingredient.id,
          name: current.ingredient.name,
          unit: current.unitByUnit,
        })

        return prev
      }, Array<RecipeIngredient | RecipeIngredientSection>()),
    steps: [...recipe.steps],
  }
  return editableRecipe
}

const timeRegexString = /(\d+):(\d+):\d+/

function parseInterval(interval: string): string {
  let match = timeRegexString.exec(interval)
  if (match) {
    let h = match[1] == '00' ? '' : `${parseInt(match[1])}h`
    let m = match[2] == '00' ? '' : `${parseInt(match[2])}m`
    let space = h && m ? ' ' : ''
    return `${h}${space}${m}`
  }
  return ''
}
