import {PokemonType} from "./PokemonType";

export type Ingredient = {
    count: number,
    name: string
}

export type Recipe = {
    type: PokemonType,
    ingredients: Ingredient[]
}