import weaknessJson from './weakness-matrix.json'
import {Matrix} from "../types/Matrix";
import {PokemonType} from "../types/PokemonType";


export const matrix = weaknessJson.map(m => {
    const keys = Object.keys(m.values) as [PokemonType]
    return {
        type: m.type as PokemonType,
        values: keys.map((type)=>{
            const value = m.values[type]
            return {
                type:type as PokemonType,
                value: value
            }
        })

    } as Matrix
})