import {BaseStats} from "../types/Pokemon";
import {Table, Text} from "@mantine/core";

enum StatComparison {
    GT, LT, SAME
}

export const PokemonStatsComponent = ({stats}:{stats:BaseStats}) => {
    const isStatBetter = (s1:number, s2:number) => {
        if(s1 > s2) {
            return StatComparison.GT
        } else if(s1 < s2) {
            return StatComparison.LT
        } else {
            return StatComparison.SAME
        }
    }
    const statColor = (comp:StatComparison) => {
        switch (comp) {
            case StatComparison.GT:
                return "green"
            case StatComparison.LT:
                return "red"
            case StatComparison.SAME:
                return ""

        }
    }
    return (
        <Table>
            <thead>
            <tr>
                <th>total</th>
                <th>hp</th>
                <th>atk</th>
                <th>def</th>
                <th>spatk</th>
                <th>spdef</th>
                <th>spd</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><Text>{stats.total}</Text></td>
                <td><Text>{stats.hp}</Text></td>
                <td><Text color={statColor(isStatBetter(stats.attack, stats.spAttack))}>{stats.attack}</Text></td>
                <td><Text color={statColor(isStatBetter(stats.defense, stats.spDefense))}>{stats.defense}</Text></td>
                <td><Text color={statColor(isStatBetter(stats.spAttack, stats.attack))}>{stats.spAttack}</Text></td>
                <td><Text color={statColor(isStatBetter(stats.spDefense, stats.defense))}>{stats.spDefense}</Text></td>
                <td><Text>{stats.speed}</Text></td>
            </tr>
            </tbody>
        </Table>
    )
}