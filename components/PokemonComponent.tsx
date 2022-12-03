import {FightingEfficiency, Multiplier, Pokemon, PokemonEfficiency} from "../types/Pokemon";
import {ActionIcon, Card, Collapse, Group, Table, Text} from "@mantine/core";
import {PokemonTypeImage} from "./PokemonTypeImage";
import {PropsWithChildren, useState} from "react";
import {groupBy} from "../utils/groupBy";
import {IconChevronDown, IconChevronUp} from "@tabler/icons";
import {PokemonImage} from "./PokemonImage";

type PokemonComponentProps = { pokemon: Pokemon }

const PokemonInfo = ({pokemon}: PokemonComponentProps) => {
    return (
        <>
            <Group position="apart" mb="md">
                <PokemonImage pokemon={pokemon}/>
                <Text weight={500} size={"lg"}>{pokemon.name}</Text>
                <Text weight={200}>#{pokemon.order}</Text>
            </Group>
            <Group>
                {pokemon.types?.map(type => <PokemonTypeImage key={type} type={type}/>)}
            </Group>
            <Group position={"center"} mt={"md"}>
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
                        <td>{pokemon.baseStats.total}</td>
                        <td>{pokemon.baseStats.hp}</td>
                        <td>{pokemon.baseStats.attack}</td>
                        <td>{pokemon.baseStats.defense}</td>
                        <td>{pokemon.baseStats.spAttack}</td>
                        <td>{pokemon.baseStats.spDefense}</td>
                        <td>{pokemon.baseStats.speed}</td>
                    </tr>
                    </tbody>
                </Table>
            </Group>
        </>
    )
}

const SourceToTarget = ({source, target}: Multiplier) => {
    return (
        <>
            <PokemonTypeImage type={source}/> {"->"} <PokemonTypeImage type={target}/>
        </>
    )
}

const PokemonTypeMultipliers = ({data}: { data: Record<string, Multiplier[]> }) => {
    const keys = Object.keys(data)
    return (
        <Table>
            <tbody>
            {
                keys.map(key => {
                    const types = data[key]
                    const trs = types.map((type, index) => {
                        return (
                            <tr key={`${key}-${index}-multipliers`}>
                                <td colSpan={types.length}>
                                    <SourceToTarget key={`${type}-${index}`} {...type} />
                                </td>
                            </tr>
                        )
                    })
                    trs.unshift(
                        <tr key={`${key}-value`}>
                            <td><Text>{key}x</Text></td>
                        </tr>
                    )
                    return trs
                })
            }
            </tbody>
        </Table>
    )
}

const PokemonEfficiencyInfo = ({efficiency}: { efficiency: FightingEfficiency }) => {
    const groupedAttackerMultipliers = groupBy(efficiency.attackMultipliers, i => i.value)
    const groupedDefenderMultipliers = groupBy(efficiency.defendMultipliers, i => i.value)
    return (
        <>
            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Doing damage:</Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
                <PokemonTypeMultipliers data={groupedAttackerMultipliers}/>
            </Group>
            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Taking damage:</Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
                <PokemonTypeMultipliers data={groupedDefenderMultipliers}/>
            </Group>
        </>
    )
}

const PokemonCard = ({children}: PropsWithChildren) => {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            {children}
        </Card>
    )
}

export const PokemonComponent = ({pokemon}: PokemonComponentProps) => {
    return (
        <PokemonCard>
            <PokemonInfo pokemon={pokemon}/>
        </PokemonCard>
    )
}

type PokemonEfficiencyProps = { pokemonEfficiency: PokemonEfficiency }
export const PokemonEfficiencyComponent = ({pokemonEfficiency}: PokemonEfficiencyProps) => {
    const [opened, setOpened] = useState(false);
    return (
        <PokemonCard>
            <PokemonInfo pokemon={pokemonEfficiency.pokemon}/>
            <Group position="center" mt="md">
                <ActionIcon size="lg" onClick={() => setOpened((o) => !o)}>
                    {
                        opened ? <IconChevronUp size={26}/> : <IconChevronDown size={26}/>
                    }
                </ActionIcon>
            </Group>
            <Collapse in={opened}>
                <PokemonEfficiencyInfo efficiency={pokemonEfficiency.efficiency}/>
            </Collapse>
        </PokemonCard>
    )
}