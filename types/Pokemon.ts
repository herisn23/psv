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
export type BaseStats = {
    total: number
    hp: number
    attack: number
    defense: number
    spAttack: number
    spDefense: number
    speed: number
}
export type Pokemon = {
    id: string
    order: number
    name: string
    abilities: string[],
    baseStats: BaseStats
    types: PokemonType[]
}