import { Maybe } from 'graphql/jsutils/Maybe'
import { assert, expect, test } from 'vitest'
import {parseTextToIngredient, Unit, SourceIngredient, regex, extractInfoFromString, MatchResult} from '../../src/stuff/parse'


let units:Unit[] = [
  {id:1, long_name:'Gramm', short_name:'g'},
  {id:2, long_name:'Liter', short_name:'L'},
  {id:3, long_name:'Stück', short_name:''},
  {id:4, long_name:'Teelöffel', short_name:'TL'},
]

let ingredients:SourceIngredient[] = [
  {id:1, name:'Mehl'},
  {id:2, name:'Zuccini'},
  {id:3, name:'Honig'},
]

test('parseTextToIngredient', () => {
  let input = "200g Mehl"

  let result =  parseTextToIngredient(units, ingredients,input)

  expect(result).toEqual({
    type:"ingredient",
    id: 1,
    amount: 200,
    ingredient_id:1,
    name: 'Mehl',
    unit:{id:1, long_name:'Gramm', short_name:'g'},
  })

  let input2 = "3 zuccini"

  let result2 =  parseTextToIngredient(units, ingredients,input2)

  expect(result2).toEqual({
    type:"ingredient",
    id: 1,
    amount: 3,
    ingredient_id:2,
    name: 'Zuccini',
    unit:{id:3, long_name:'Stück', short_name:''},
  })
})



test('regex test', () => {
  expect(regex.test("")).toBe(false)
  expect(regex.test("100g Mehl")).toBe(true)
  expect(regex.test("100 g Mehl")).toBe(true)
  expect(regex.test("10 Dosen Tomaten")).toBe(true)
  expect(regex.test("30 Gramm brauner Zucker")).toBe(true)
  expect(regex.test("3 Karotten")).toBe(true)
})

test('regex extraction test', () => {
  
  expect(extractInfoFromString("Mehl")).toBe(undefined)
  expect(extractInfoFromString("100g Mehl")).toEqual({
    amount:100,
    unitName:'g', 
    ingredientName:'Mehl'
  })
   expect(extractInfoFromString("100 g Mehl")).toEqual({
    amount:100,
    unitName:'g', 
    ingredientName:'Mehl'
  })
   expect(extractInfoFromString("10 Dosen Tomaten")).toEqual({
    amount:10,
    unitName:'Dosen', 
    ingredientName:'Tomaten'
  })
   expect(extractInfoFromString("30 Gramm brauner Zucker")).toEqual({
    amount:30,
    unitName:'Gramm', 
    ingredientName:'brauner Zucker'
  })
   expect(extractInfoFromString("3 Karotten")).toEqual({
    amount:3,
    unitName:undefined, 
    ingredientName:'Karotten'
  })
})


