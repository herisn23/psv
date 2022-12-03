import {Group, Select, SelectItem, Text} from "@mantine/core";
import {ComponentPropsWithoutRef, forwardRef, useState} from "react";
import {Pokemon} from "../types/Pokemon";
import {usePokedex} from "../context/DataContext";
import {PokemonImage} from "./PokemonImage";

interface ItemProps extends ComponentPropsWithoutRef<'div'> {
    pokemon:Pokemon
}

// eslint-disable-next-line react/display-name
const PokemonItem = forwardRef<HTMLDivElement, ItemProps>(
    ({pokemon, ...others}: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <PokemonImage pokemon={pokemon} width={20} height={20} />
                <Text>#{pokemon.order} - {pokemon.name}</Text>
            </Group>
        </div>
    )
);

type PokemonTypeSelectProps = {onPick:(type?:Pokemon)=>void}

export const PokemonSelect = ({onPick}:PokemonTypeSelectProps) => {
    const pokedex = usePokedex()
    const filterPokedex = (search?:String) =>
        pokedex.filter(p=>{
            if(search) {
                return p.name.toLowerCase().includes(search.toLowerCase())
            } else {
                return true
            }
        }).slice(0, 20)
    const [data, setData] = useState(filterPokedex())
    return (
        <Select
            itemComponent={PokemonItem}
            placeholder={"Boss"}
            data={data.map(i=>{
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
            onInput={e=>{
                // @ts-ignore
                setData(filterPokedex(e.target['value'] as string))
            }}
        />
    )
}