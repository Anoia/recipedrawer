import gql from 'graphql-tag'
import { EditableRecipe } from 'src/types/Recipe'

export const getRecipeQuery = gql`
        query get_recipe($id: Int!) {
          recipes_by_pk(id: $id) {
            id
            name
            description
            steps
            user {
              name
            }
            recipe_ingredients {
              amount
              ingredient {
                id
                name
              }
              unitByUnit {
                id
                long_name
                short_name
              }
            }
          }
        }`

export function parseGetRecipeQueryResult(result:any):EditableRecipe{
    let recipe = result.recipes_by_pk
    return {
        name: recipe.name,
        description: recipe.description,
        steps: recipe.steps.map((s: any) => {
            return { id: s.id, content: s.content }
        }),
        recipeIngredients: recipe.recipe_ingredients.map((item: any) => {
            return {
                id: item.ingredient.id,
                name: item.ingredient.name,
                amount: item.amount,
                unit:item.unitByUnit
            }
        })
    }

}