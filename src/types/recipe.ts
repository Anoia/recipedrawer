import { inject } from 'vue'
import { Cloudinary } from '@cloudinary/url-gen'
import { Resize } from '@cloudinary/url-gen/actions'

export type Unit = {
  id: number
  long_name: string
  short_name: string
}

export type Ingredient = {
  index:number
  id: string
  name: string
  amount: number
  unit: Unit
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
  recipeIngredients: Ingredient[]
}

export function getImageUrl(
  imageId:string,
  w: number,
  h: number
): string {
  if (imageId) {
    const cloudinary = inject('cloudinary') as Cloudinary
    const image = cloudinary.image(imageId)
    image.resize(Resize.fill().width(w).height(h))
    return image.toURL()
  } else {
    return `https://via.placeholder.com/${h}`
  }
}

export function getEmptyRecipe(): EditableRecipe {
  return {
    name: '',
    description: '',
    image: '',
    steps: [],
    recipeIngredients: [],
  }
}
