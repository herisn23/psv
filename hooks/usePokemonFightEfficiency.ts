import {useMatrix} from "../context/DataContext";
import {useCallback} from "react";
import {PokemonType} from "../types/PokemonType";
import {FightingEfficiency, Multiplier} from "../types/Pokemon";

export const usePokemonFightEfficiency = () => {
    const matrix = useMatrix()
    const findMultipliers = useCallback((attacking: PokemonType[], defending: PokemonType[], teraType?:PokemonType) =>
        matrix.filter(m => attacking.includes(m.type))
            .map(m => {
                return m.values
                    .filter(m2 => defending.filter(d=>d === teraType || teraType === undefined).includes(m2.type))
                    .map(m2 => {
                        return {
                            target: m2.type,
                            source: m.type,
                            value: m2.value
                        } as Multiplier
                    })
            })
            .flat(), [matrix])
    return useCallback((attackerTypes: PokemonType[], defenderTypes: PokemonType[], teraType:PokemonType) => {
        const attackMultipliers = findMultipliers(attackerTypes, defenderTypes, teraType)
        const defendMultipliers = findMultipliers(defenderTypes, attackerTypes)
        return {
            attackMultipliers,
            defendMultipliers
        } as FightingEfficiency
    }, [findMultipliers])
}