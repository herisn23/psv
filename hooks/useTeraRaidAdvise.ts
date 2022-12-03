import {PokemonType} from "../types/PokemonType";
import {useMatrix, usePokedex} from "../context/DataContext";
import {Pokemon, PokemonEfficiency} from "../types/Pokemon";
import {useCallback} from "react";
import {useCalculatePokemonScore} from "./useCalculatePokemonScore";
import {usePokemonFightEfficiency} from "./usePokemonFightEfficiency";


const useEligibilityCheck = () => {
    const matrix = useMatrix()
    const check = useCallback((pokemon: Pokemon, type: PokemonType, boss?:Pokemon) => {
        //find raider damages multiplier > 1
        const raiderMatrix = matrix.filter(m => pokemon.types.includes(m.type)).map(m => m.values).flat()
        const raiderAllowedDamages = raiderMatrix.filter(m => m.type === type && m.value >= 1)
        const raiderDoGoodDamage = raiderAllowedDamages.length > 1

        //find boss damages multipliers < 2
        const bossMatrix = matrix.find(m => m.type === type)?.values ?? []
        const bossAllowedDamages = bossMatrix.filter(m => m.value > 1 && pokemon.types.includes(m.type))
        const raiderReceiveLowDamage = bossAllowedDamages.length == 0
        return raiderDoGoodDamage && raiderReceiveLowDamage
    }, [matrix])
    return [check]
}

export const useTeraRaidAdvise = () => {
    const pokedex = usePokedex()
    const [check] = useEligibilityCheck()
    const assemble = usePokemonFightEfficiency()
    const calculateScore = useCalculatePokemonScore()
    return (type: PokemonType, boss?:Pokemon) => {
        return new Promise<PokemonEfficiency[]>(resolve => {
            const eligiblePokemons = pokedex.filter(e => check(e, type, boss))//.slice(0, 1)
            resolve(
                eligiblePokemons.map(pokemon => {
                    const defenderTypes = [type].concat(boss?.types ?? [])
                    const efficiency = assemble(pokemon.types, defenderTypes, type)
                    const score = calculateScore(efficiency, type)
                    return {
                        pokemon,
                        efficiency,
                        score
                    } as PokemonEfficiency
                }).sort((a, b) => {
                    const aScore = a.score + Number(a.pokemon.meta) * 10
                    const bScore = b.score + Number(b.pokemon.meta) * 10
                    if(aScore == bScore) {
                        return a.pokemon.order > b.pokemon.order ? -1 : 0
                    } else if(aScore > bScore) {
                        return -1
                    } else {
                        return 0
                    }
                })
            )
        })
    }
}