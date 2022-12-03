import {Group, Select, SelectItem, Text} from "@mantine/core";
import {ComponentPropsWithoutRef, forwardRef} from "react";
import {PokemonTypeImage} from "./PokemonTypeImage";
import {Pokemon} from "../types/Pokemon";
import {usePokedex} from "../context/DataContext";

interface ItemProps extends ComponentPropsWithoutRef<'div'> {
    pokemon:Pokemon
}

// eslint-disable-next-line react/display-name
const PokemonItem = forwardRef<HTMLDivElement, ItemProps>(
    ({pokemon, ...others}: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Text>#{pokemon.order} - {pokemon.name}</Text>
                {pokemon.types.map(t=><PokemonTypeImage key={t} type={t} />)}
            </Group>
        </div>
    )
);

type PokemonTypeSelectProps = {onPick:(type?:Pokemon)=>void}

export const PokemonSelect = ({onPick}:PokemonTypeSelectProps) => {
    const pokedex = usePokedex()
    return (
        <Select
            itemComponent={PokemonItem}
            placeholder={"Boss"}
            data={pokedex.map(i=>{
                return {
                    value:`${i.order}`,
                    label:i.name,
                    pokemon:i
                } as SelectItem
            })}
            clearable
            searchable
            onChange={value => {
                onPick(pokedex.find(p=>`${p.order}` === value))
            }}
            nothingFound="Type not found"
            filter={(value, item) =>
                item.pokemon.name.toLowerCase().includes(value.toLowerCase())
            }
        />
    )
}