import gql from 'graphql-tag'
import { EditableRecipe } from 'src/types/recipe'

export const getRecipeQuery = gql`
  query get_recipe($id: Int!) {
    recipes_by_pk(id: $id) {
      id
      name
      description
      image
      steps
      user {
        name
      }
      recipe_ingredients {
        id
        index
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
  }
`

export function parseGetRecipeQueryResult(result: any): EditableRecipe {
  let recipe = result.recipes_by_pk
  let parsedRecipe:EditableRecipe = {
    name: recipe.name,
    description: recipe.description,
    image: recipe.image,
    steps: recipe.steps.map((s: any) => {
      return { id: s.id, content: s.content }
    }),
    recipeIngredients: [...recipe.recipe_ingredients].sort((a:any,b:any) => (a.index < b.index ? -1: 1)).map((item: any) => {
      return {
        id:item.id,
        index:item.index,
        ingredient_id: item.ingredient.id,
        name: item.ingredient.name,
        amount: item.amount,
        unit: item.unitByUnit,
      }
    }),
  }
  return parsedRecipe
}


export const editRecipeMutation = gql`  
  mutation edit(
    $rid: Int!
    $nin: [Int!]!
    $inputtest_insert: [recipe_ingredients_insert_input!]!
    $inputtest_update: [recipe_ingredients_insert_input!]!
    $description: String
    $name: String
    $steps: jsonb
    $image: String = ""
  ) {

    delete_recipe_ingredients(
      where: { recipe_id: { _eq: $rid }, id: { _nin: $nin } }
    ) {
      affected_rows
    }
    update_recipes_by_pk(
      pk_columns: { id: $rid }
      _set: {
        image: $image
        name: $name
        description: $description
        steps: $steps
      }
    ) {
      id
    }
  update_ingredients: insert_recipe_ingredients(objects: $inputtest_update, on_conflict: {constraint: recipe_ingredients_pkey, update_columns: [amount, unit, index]}) {
    affected_rows
  }
  insert_ingredients:insert_recipe_ingredients(objects: $inputtest_insert) {
    returning {
      id
    }
     affected_rows
  }

  }
`

export const createRecipeMutation = gql`
  mutation create_recipe(
    $description: String
    $name: String
    $steps: jsonb
    $data: [recipe_ingredients_insert_input!]!
  ) {
    insert_recipes_one(
      object: {
        description: $description
        name: $name
        steps: $steps
        recipe_ingredients: { data: $data }
      }
    ) {
      id
      description
      name
      steps
      recipe_ingredients {
        amount
        ingredient_id
        unit
        index
      }
    }
  }
`
