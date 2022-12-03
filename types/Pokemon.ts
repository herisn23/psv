import {PokemonType} from "./PokemonType";


export type Multiplier = {
    source: PokemonType
    target: PokemonType
    value: number
}

export type FightingEfficiency = {
    attackMultipliers: Multiplier[]
    defendMultipliers: Multiplier[]
}

export type PokemonEfficiency = {
    pokemon: Pokemon
    score: number
    efficiency: FightingEfficiency
}

export type Pokemon = {
    order: number
    name: string
    meta: boolean
    types: PokemonType[]
}