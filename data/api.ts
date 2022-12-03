import weaknessJson from './weakness-matrix.json'
import pokedexJson from './pokedex.json'
import {Matrix} from "../types/Matrix";
import {PokemonType} from "../types/PokemonType";
import {Pokemon} from "../types/Pokemon";


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
    const forms = p.forms?.map((form, index) => (
        {
            name: form.name,
            types: form.types,
            order: parseFloat(`${p.order}.${index + 1}`),
            meta: false
        } as Pokemon
    )) ?? []
    forms.unshift({
        name: p.name,
        order: p.order,
        types: p.types,
        meta: p.meta ?? false
    } as Pokemon)
    return forms
}).flat()