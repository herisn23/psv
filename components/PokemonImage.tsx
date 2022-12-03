import Image from "next/image";
import {Pokemon} from "../types/Pokemon";
import {Avatar} from '@mantine/core';

export type PokemonTypeImageOrientation = 'horizontal' | 'vertical'


type PokemonImageProps = { pokemon: Pokemon, size?: number }

export const PokemonImage = ({pokemon, size = 50}: PokemonImageProps) =>
    <Image src={`/pokeimage/${pokemon.id}.png`}
           width={size} height={size}
           alt={pokemon.name}
    />

export const PokemonAvatar = ({pokemon, size = 60}: PokemonImageProps) =>
    <Avatar src={`/pokeimage/${pokemon.id}.png`} alt="it's me" size={size} />