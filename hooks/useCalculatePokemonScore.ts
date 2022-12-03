import {FightingEfficiency} from "../types/Pokemon";

const multiply = (numbers: number[]) => numbers.reduce((partialSum, a) => partialSum * a, 1)
const sum = (numbers: number[]) => numbers.reduce((partialSum, a) => partialSum + a, 0)
const highest = (numbers: number[]) => numbers.sort((a, b) => a > b ? -1 : 0)[0]
export const useCalculatePokemonScore = () => {
    return (efficiency: FightingEfficiency) => {
        const attackScore = highest(efficiency.attackMultipliers.map(i => i.value))
        const defendScore = multiply(efficiency.defendMultipliers.map(i => i.value))
        return attackScore - defendScore
    }
}