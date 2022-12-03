import {FightingEfficiency} from "../types/Pokemon";
import {PokemonType} from "../types/PokemonType";
import {groupBy} from "../utils/groupBy";

const multiply = (numbers: number[]) => numbers.reduce((partialSum, a) => partialSum * a, 1)
const sum = (numbers: number[]) => numbers.reduce((partialSum, a) => partialSum + a, 0)
const highest = (numbers: number[]) => numbers.sort((a, b) => a > b ? -1 : 0)[0]
export const useCalculatePokemonScore = () => {
    return (efficiency: FightingEfficiency, teraType: PokemonType) => {
        const attackScore = highest(efficiency.attackMultipliers.map(i => i.value))
        const defendScoreGrouped = groupBy(efficiency.defendMultipliers, i => i.source)
        const defendMultiplierScores = Object.keys(defendScoreGrouped).map(key => {
            const multipliers = defendScoreGrouped[key as PokemonType].map(i => i.value)
            return multiply(multipliers)
        })
        const defendScore = highest(defendMultiplierScores)
        return attackScore - defendScore
    }
}