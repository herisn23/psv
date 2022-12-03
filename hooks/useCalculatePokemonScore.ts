import {FightingEfficiency} from "../types/Pokemon";

const multiply = (numbers: number[]) => numbers.reduce((partialSum, a) => partialSum * a, 1)

export const useCalculatePokemonScore = () => {
    return (efficiency: FightingEfficiency) => {
        const attackScore = multiply(efficiency.attackMultipliers.map(i => i.value))
        const defendScore = multiply(efficiency.defendMultipliers.map(i => i.value))
        return attackScore - defendScore
    }
}