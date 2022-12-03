import Image from "next/image";
import {Pokemon} from "../types/Pokemon";

export type PokemonTypeImageOrientation = 'horizontal' | 'vertical'


type PokemonImageProps = { pokemon: Pokemon, width?: number, height?: number }

export const PokemonImage = ({pokemon, width = 50, height = 50}: PokemonImageProps) =>
    <Image src={`/pokeimage/${pokemon.id}.png`}
           width={width} height={height}
           alt={pokemon.name}
    />