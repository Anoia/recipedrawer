import { Maybe } from 'graphql/jsutils/Maybe'

export type Unit = { id: number; long_name: string; short_name: string }
export type SourceIngredient = { id: number; name: string }

export const regexStringIngredientInput =
  /([0-9.,]{1,})([ ]*)([a-zA-ZäÄöÖüÜß]{0,})([ ]+)([a-zA-ZäÄöÖüÜß ]+)/

export type MatchResult = {
  amount: number
  unitName: Maybe<string>
  ingredientName: string
}

export function extractRecipeMatchResult(input: string): Maybe<MatchResult> {
  let match = regexStringIngredientInput.exec(input)

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

export type Time = {
  minutes: number | undefined
  hours: number | undefined
}

export const regexStringTime =
  /(([0-9]{0,})([ ]*)([Hh]ours|[Hh]our|[Hh]))?([ ]*)(([0-9]{0,})?([ ]*)([Mm]inutes|[Mm]inute|[Mm]))?/

export function extractTimeFromString(input: string): Maybe<Time> {
  let match = regexStringTime.exec(input)

  if (match) {
    let m = parseInt(match[7])
    let h = parseInt(match[2])

    if (Number.isInteger(m) || Number.isInteger(h)) {
      return {
        minutes: Number.isInteger(m) ? m : undefined,
        hours: Number.isInteger(h) ? h : undefined,
      }
    }
  }
  return undefined
}

export function convertTimeToInterval(time: Time): string {
  let hours: string = time.hours ? `${time.hours}h` : ''
  let minutes: string = time.minutes ? `${time.minutes}m` : ''
  return hours + minutes
}

export function inputStringToInterval(input: string | undefined) {
  if (input) {
    let time = extractTimeFromString(input)
    if (time) {
      return convertTimeToInterval(time)
    }
  }
  return undefined
}
