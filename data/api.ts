import weaknessJson from './weakness-matrix.json'
import pokedexJson from './pokedex.json'
import recipesJson from './recipes.json'
import {Matrix} from "../types/Matrix"
import {PokemonType} from "../types/PokemonType"
import {Pokemon} from "../types/Pokemon"
import {Recipe} from "../types/Recipe";


export const matrix = weaknessJson.map(m => {
    const keys = Object.keys(m.values) as [PokemonType]
    return {
        type: m.type as PokemonType,
        values: keys.map((type) => {
            const value = m.values[type]
            return {
                type: type as PokemonType,
                value: value
            }
        })

    } as Matrix
})

export const pokedex = pokedexJson.map(p => {
    return {
        id: p.id,
        order: parseFloat(p.order),
        name: p.name,
        abilities: p.abilities,
        types: p.types,
        baseStats: p.baseStats,
        meta: p.meta
    } as Pokemon
}).flat()

export const recipes = recipesJson as Recipe[]