import {PokemonType} from "./PokemonType";

export type MatrixValue = { type: PokemonType, value: number }


export type Matrix = {
    type: PokemonType
    values: MatrixValue[]
}