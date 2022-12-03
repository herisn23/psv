import {Group, Select} from "@mantine/core";
import {PokemonType, pokemonTypes} from "../types/PokemonType";
import {ComponentPropsWithoutRef, forwardRef} from "react";
import {PokemonTypeImage} from "./PokemonTypeImage";

const data = pokemonTypes.map(t => t)

interface ItemProps extends ComponentPropsWithoutRef<'div'> {
    value: PokemonType
}

// eslint-disable-next-line react/display-name
const PokemonTypeItem = forwardRef<HTMLDivElement, ItemProps>(
    ({value, ...others}: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <PokemonTypeImage type={value}/>
            </Group>
        </div>
    )
);

type PokemonTypeSelectProps = {onPick:(type:PokemonType)=>void}

export const PokemonTypeSelect = ({onPick}:PokemonTypeSelectProps) => {

    return (
        <Select
            itemComponent={PokemonTypeItem}
            placeholder={"Choose type of Tera type"}
            data={data}
            clearable
            searchable
            onChange={onPick}
            nothingFound="Type not found"
            filter={(value, item) =>
                item.value.toLowerCase().includes(value.toLowerCase())
            }
        />
    )
}