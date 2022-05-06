import { Maybe } from 'graphql/jsutils/Maybe'
import { RecipeIngredient } from 'src/types/recipe'

export type Unit = { id: number; long_name: string; short_name: string }
export type SourceIngredient = { id: number; name: string }

const regexString = '([0-9.,]{1,})([ ]*)([a-zA-ZäÄöÖüÜ]{0,})([ ]+)([a-zA-ZäÄöÖüÜ ]+)'

export const regex: RegExp = RegExp(regexString)

let defaultUnit: Unit = { id: 3, long_name: 'Stück', short_name: '' }

export function parseTextToIngredient(
  units: Unit[],
  ingredients: SourceIngredient[],
  input: string
): Maybe<RecipeIngredient> {
  let maybeMatch = extractInfoFromString(input)

  if (maybeMatch) {
    let match = maybeMatch as MatchResult
    let unitText = match.unitName ?? ''
    let unit =
      units.find(
        (u) =>
          u.long_name.toLowerCase() === unitText.toLowerCase() ||
          u.short_name.toLowerCase() === unitText.toLowerCase()
      ) ?? defaultUnit

    let ingredient = ingredients.find(
      (i) => i.name.toLowerCase() === match.ingredientName.toLowerCase()
    )

    if (ingredient) {
      return {
        id: 1,
        amount: match.amount,
        ingredient_id: ingredient.id,
        name: ingredient.name,
        unit: unit,
      }
    } else {
      return undefined
    }
  } else {
    return undefined
  }
}

export type MatchResult = {
  amount: number
  unitName: Maybe<string>
  ingredientName: string
}

export function extractInfoFromString(input: string): Maybe<MatchResult> {
  let match = regex.exec(input)

  if (!match || match.length < 6) {
    return undefined
  } else {
    return {
      amount: +match[1],
      unitName: match[3] == '' ? undefined : match[3],
      ingredientName: match[5],
    }
  }
}
