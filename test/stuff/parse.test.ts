import { expect, test } from 'vitest'
import {regexStringIngredientInput, extractRecipeMatchResult, extractTimeFromString} from '../../src/stuff/parse'



test('ingredient regex should match correctly', () => {
  expect(regexStringIngredientInput.test("")).toBe(false)
  expect(regexStringIngredientInput.test("100g Mehl")).toBe(true)
  expect(regexStringIngredientInput.test("100 g Mehl")).toBe(true)
  expect(regexStringIngredientInput.test("10 Dosen Tomaten")).toBe(true)
  expect(regexStringIngredientInput.test("30 Gramm brauner Zucker")).toBe(true)
  expect(regexStringIngredientInput.test("3 Karotten")).toBe(true)
  expect(regexStringIngredientInput.test("3 Möhren")).toBe(true)
  expect(regexStringIngredientInput.test("3 Weiße Bohnen")).toBe(true)
})

test('ingredient regex extraction should match correctly', () => {
  
  expect(extractRecipeMatchResult("Mehl")).toBe(undefined)
  expect(extractRecipeMatchResult("100g Mehl")).toEqual({
    amount:100,
    unitName:'g', 
    ingredientName:'Mehl'
  })
   expect(extractRecipeMatchResult("100 g Mehl")).toEqual({
    amount:100,
    unitName:'g', 
    ingredientName:'Mehl'
  })
   expect(extractRecipeMatchResult("10 Dosen Tomaten")).toEqual({
    amount:10,
    unitName:'Dosen', 
    ingredientName:'Tomaten'
  })
   expect(extractRecipeMatchResult("30 Gramm brauner Zucker")).toEqual({
    amount:30,
    unitName:'Gramm', 
    ingredientName:'brauner Zucker'
  })
   expect(extractRecipeMatchResult("3 Karotten")).toEqual({
    amount:3,
    unitName:undefined, 
    ingredientName:'Karotten'
  })
})

test('time extraction', () => {
  expect(extractTimeFromString("3h 5m")).toEqual({
    hours:3,
    minutes:5    
  })

  expect(extractTimeFromString("10 minutes")).toEqual({
    minutes:10
  })

  expect(extractTimeFromString("3 hours")).toEqual({
    hours:3
  })

  expect(extractTimeFromString("5 days")).toEqual(undefined)
  expect(extractTimeFromString(" ")).toEqual(undefined)
})


