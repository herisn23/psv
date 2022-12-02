import {matrix} from "../data/api";
import {PokemonType, pokemonTypes} from "../types/PokemonType";
import {Matrix, MatrixValue} from "../types/Matrix";
import {useMemo} from "react";


export const useBuildMatrix = () => useMemo(()=>{
    const findValue = (type: PokemonType, values: MatrixValue[]) => {
        return values.find(p => p.type == type)
    }
    //re-populate json for missing values
    const m:Matrix[] = matrix.map(m => (
        {
            type: m.type,
            values: pokemonTypes.map(t => {
                const foundValue = findValue(t, m.values)
                return {type: t, value: foundValue?.value ?? 1}
            })
        }
    ))
    return m
}, [])