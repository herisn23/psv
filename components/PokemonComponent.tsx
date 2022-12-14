import {FightingEfficiency, Multiplier, Pokemon, PokemonEfficiency} from "../types/Pokemon";
import {ActionIcon, Card, Collapse, Group, Table, Text} from "@mantine/core";
import {PokemonTypeImage} from "./PokemonTypeImage";
import {PropsWithChildren, useState} from "react";
import {groupBy} from "../utils/groupBy";
import {IconChevronDown, IconChevronUp} from "@tabler/icons";
import {PokemonAvatar} from "./PokemonImage";
import {PokemonStatsComponent} from "./PokemonStatsComponent";

type PokemonComponentProps = { pokemon: Pokemon }

const PokemonInfo = ({pokemon}: PokemonComponentProps) => {
    return (
        <>
            <Group position="apart" mb="md" p={0}>
                <PokemonAvatar pokemon={pokemon} />
                <Text>{pokemon.name}</Text>
                <Text sx={{position:"absolute", right:0, top:0}} mt={10} mr={15} weight={100}>#{pokemon.order}</Text>
            </Group>
            <Group>
                {pokemon.types?.map(type => <PokemonTypeImage key={type} type={type}/>)}
            </Group>
            <Group position={"center"} mt={"md"}>
                <PokemonStatsComponent stats={pokemon.baseStats} />
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
        <Card shadow="md" p="md" radius="md" withBorder>
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