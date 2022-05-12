import { inject } from 'vue'
import { Cloudinary } from '@cloudinary/url-gen'
import { Resize } from '@cloudinary/url-gen/actions'

export type Unit = {
  id: number
  long_name: string
  short_name: string
}

export type Ingredient = {
  id: number
  name: string
}

export type RecipeIngredient = {
  type: 'ingredient'
  id: number | undefined
  ingredient_id: number
  name: string
  amount: number
  unit: Unit
}
export type RecipeIngredientSection = {
  type: 'section'
  name: string
}

export type Step = {
  id: string
  content: string
}

export type EditableRecipe = {
  name: string
  description: string
  image: string
  steps: Step[]
  recipeIngredients: Array<RecipeIngredient | RecipeIngredientSection>
  portions: number
  cookingTime: string | undefined
  prepTime: string | undefined
}

export function getImageUrl(imageId: string, w: number, h: number): string {
  if (imageId) {
    const cloudinary = inject('cloudinary') as Cloudinary
    const image = cloudinary.image(imageId)
    image.resize(Resize.fill().width(w).height(h))
    return image.toURL()
  } else {
    return `https://picsum.photos/${w}/${h}`
  }
}

export function getEmptyRecipe(): EditableRecipe {
  return {
    name: '',
    description: '',
    image: '',
    steps: [],
    recipeIngredients: [],
    portions: 2,
    cookingTime: undefined,
    prepTime: undefined,
  }
}
