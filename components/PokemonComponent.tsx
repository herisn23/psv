import {FightingEfficiency, Multiplier, Pokemon, PokemonEfficiency} from "../types/Pokemon";
import {Badge, Button, Card, Collapse, Group, Table, Text} from "@mantine/core";
import {PokemonTypeImage} from "./PokemonTypeImage";
import {PropsWithChildren, useState} from "react";

type PokemonComponentProps = { pokemon: Pokemon }

// A little bit simplified version
const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
    }, {} as Record<K, T[]>);

const PokemonInfo = ({pokemon}: PokemonComponentProps) => {
    return (
        <>
            <Group position="apart" mb="md">
                <Text weight={500} size={"lg"}>{pokemon.name} {pokemon.meta && <Badge>Meta</Badge>}</Text>
                <Text weight={200}>#{pokemon.order}</Text>
            </Group>
            <Group>
                {pokemon.types?.map(type => <PokemonTypeImage key={type} type={type}/>)}
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
            <Group position="apart" mt="md" mb="xs">
                <Text>Score: {pokemonEfficiency.score}</Text>
            </Group>
            <Button onClick={() => setOpened((o) => !o)}>
                {opened ? "Hide multipliers" : "Show multipliers"}
            </Button>
            <Collapse in={opened}>
                <PokemonEfficiencyInfo efficiency={pokemonEfficiency.efficiency}/>
            </Collapse>
        </PokemonCard>
    )
}