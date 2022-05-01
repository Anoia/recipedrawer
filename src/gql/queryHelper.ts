import gql from 'graphql-tag'
import { Recipes } from '../generated/graphql.d'

export function parseAllRecipesResult(result:Array<Recipes>):Array<Recipes>{
    return result
}